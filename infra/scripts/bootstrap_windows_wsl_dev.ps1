[CmdletBinding()]
param(
    [string]$Distro = "Ubuntu",
    [switch]$InstallMissingWindowsComponents,
    [switch]$InstallDockerDesktopWithWinget,
    [switch]$BootstrapLinuxPackages = $true,
    [switch]$PauseAtEnd
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$LogPath = Join-Path $ScriptDir ("bootstrap_windows_wsl_dev_" + $Timestamp + ".log")
$StatusPath = Join-Path $ScriptDir "bootstrap_windows_wsl_dev.last-run.txt"

Start-Transcript -Path $LogPath -Force | Out-Null

function Write-StatusFile {
    param(
        [string]$State,
        [string]$Message
    )

    @(
        "state=$State"
        "timestamp=$(Get-Date -Format s)"
        "log_path=$LogPath"
        "message=$Message"
    ) | Set-Content -Encoding utf8 $StatusPath
}

function Finish-Script {
    param(
        [string]$State,
        [string]$Message,
        [int]$ExitCode
    )

    Write-StatusFile -State $State -Message $Message
    Write-Host ""
    Write-Host ("Статус: " + $State) -ForegroundColor Cyan
    Write-Host ("Сообщение: " + $Message) -ForegroundColor White
    Write-Host ("Лог: " + $LogPath) -ForegroundColor White
    Write-Host ("Сводка: " + $StatusPath) -ForegroundColor White
    Stop-Transcript | Out-Null

    if ($PauseAtEnd) {
        Read-Host "Нажми Enter, чтобы закрыть окно"
    }

    exit $ExitCode
}

function Write-Step {
    param([string]$Message)
    Write-Host ""
    Write-Host ("==> " + $Message) -ForegroundColor Cyan
}

function Write-Ok {
    param([string]$Message)
    Write-Host ("[OK] " + $Message) -ForegroundColor Green
}

function Write-Warn {
    param([string]$Message)
    Write-Host ("[WARN] " + $Message) -ForegroundColor Yellow
}

function Write-Info {
    param([string]$Message)
    Write-Host ("[INFO] " + $Message) -ForegroundColor Gray
}

function Test-Admin {
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = [Security.Principal.WindowsPrincipal]::new($identity)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Test-CommandExists {
    param([string]$Name)
    return $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

function Get-WslDistroList {
    $output = & wsl.exe -l -q 2>$null
    if ($LASTEXITCODE -ne 0 -or -not $output) {
        return @()
    }

    return @($output | ForEach-Object { $_.Trim() } | Where-Object { $_ })
}

function Invoke-WslBash {
    param(
        [string]$TargetDistro,
        [string]$Command
    )

    & wsl.exe -d $TargetDistro -- bash -lc $Command
    return $LASTEXITCODE
}

function Install-WslAndUbuntu {
    param([string]$TargetDistro)

    if (-not (Test-Admin)) {
        throw "Для установки WSL нужен запуск PowerShell от имени администратора."
    }

    Write-Step "Устанавливаю WSL и дистрибутив $TargetDistro"
    & wsl.exe --install -d $TargetDistro
    if ($LASTEXITCODE -ne 0) {
        throw "Команда 'wsl --install -d $TargetDistro' завершилась с кодом $LASTEXITCODE."
    }

    Write-Warn "WSL установлен. Заверши первичную настройку Ubuntu после перезагрузки Windows."
    Write-Warn "После этого повторно запусти этот скрипт без флага установки."
    Finish-Script -State "PENDING_REBOOT" -Message "WSL и Ubuntu установлены. Нужна перезагрузка и первичная настройка Ubuntu." -ExitCode 0
}

function Install-DockerDesktopViaWinget {
    if (-not (Test-CommandExists "winget")) {
        Write-Warn "winget не найден. Автоматическая установка Docker Desktop недоступна."
        return
    }

    Write-Step "Пробую установить Docker Desktop через winget"
    Write-Info "Если установка через winget не сработает, используй официальный installer Docker Desktop."
    & winget install -e --id Docker.DockerDesktop --accept-source-agreements --accept-package-agreements
    if ($LASTEXITCODE -eq 0) {
        Write-Ok "Docker Desktop установлен или уже был установлен."
        return
    }

    Write-Warn "winget не смог установить Docker Desktop. Перейди на официальный installer:"
    Write-Host "https://docs.docker.com/desktop/setup/install/windows-install/"
}

try {
    Write-Step "Проверяю Windows-инструменты"
    Write-Info "Лог текущего запуска: $LogPath"

    if (-not (Test-CommandExists "wsl.exe")) {
        throw "WSL CLI не найден. Проверь, что Windows Subsystem for Linux доступен в системе."
    }
    Write-Ok "wsl.exe найден"

    $dockerDesktopExe = Join-Path $env:ProgramFiles "Docker\Docker\Docker Desktop.exe"
    $dockerCliPath = Get-Command docker -ErrorAction SilentlyContinue
    $wingetExists = Test-CommandExists "winget"

    if ($wingetExists) {
        Write-Ok "winget найден"
    } else {
        Write-Warn "winget не найден в PATH. Автоустановка desktop-приложений может быть недоступна."
    }

    $distros = Get-WslDistroList
    $distroExists = $distros -contains $Distro

    if (-not $distroExists) {
        Write-Warn "Дистрибутив '$Distro' не найден в WSL."
        if ($InstallMissingWindowsComponents) {
            Install-WslAndUbuntu -TargetDistro $Distro
        } else {
            throw "Ubuntu в WSL не найдена. Запусти скрипт с флагом -InstallMissingWindowsComponents или вручную выполни 'wsl --install -d $Distro' от имени администратора."
        }
    }

    Write-Ok "WSL-дистрибутив '$Distro' найден"

    if (Test-Path $dockerDesktopExe) {
        Write-Ok "Docker Desktop найден: $dockerDesktopExe"
    } elseif ($dockerCliPath) {
        Write-Ok "docker CLI найден: $($dockerCliPath.Source)"
    } else {
        Write-Warn "Docker Desktop не найден."
        if ($InstallDockerDesktopWithWinget) {
            Install-DockerDesktopViaWinget
        } else {
            Write-Host "Для автоустановки перезапусти скрипт с флагом -InstallDockerDesktopWithWinget" -ForegroundColor Yellow
            Write-Host "Или установи вручную по инструкции Docker Docs:" -ForegroundColor Yellow
            Write-Host "https://docs.docker.com/desktop/setup/install/windows-install/" -ForegroundColor Yellow
        }
    }

    Write-Step "Проверяю доступность WSL-команд"
    $wslProbeExit = Invoke-WslBash -TargetDistro $Distro -Command "echo WSL_OK"
    if ($wslProbeExit -ne 0) {
        throw "Не удалось выполнить команду внутри '$Distro'. Заверши первичную настройку Ubuntu и повтори запуск."
    }
    Write-Ok "Команды внутри '$Distro' выполняются"

    if ($BootstrapLinuxPackages) {
        Write-Step "Устанавливаю базовые пакеты внутри '$Distro'"
        $installCommand = "set -e; export DEBIAN_FRONTEND=noninteractive; sudo apt-get update; sudo apt-get install -y make git curl ca-certificates build-essential; command -v make >/dev/null; command -v git >/dev/null"
        $linuxPackagesExit = Invoke-WslBash -TargetDistro $Distro -Command $installCommand
        if ($linuxPackagesExit -ne 0) {
            throw "Не удалось установить базовые пакеты внутри '$Distro'."
        }
        Write-Ok "Внутри '$Distro' установлены make, git, curl и build-essential"
    }

    Write-Step "Финальная памятка"
    Write-Host "1. Запусти Docker Desktop и дождись статуса Running." -ForegroundColor White
    Write-Host "2. В Docker Desktop включи Settings -> Resources -> WSL Integration -> $Distro." -ForegroundColor White
    Write-Host "3. Открой Ubuntu и проверь:" -ForegroundColor White
    Write-Host "   make --version" -ForegroundColor Gray
    Write-Host "   docker version" -ForegroundColor Gray
    Write-Host "4. Для работы с проектом желательно держать git-копию в файловой системе Linux, а не в /mnt/*." -ForegroundColor White
    Write-Host "5. После этого поднимай проект из репозитория командами make init / make up." -ForegroundColor White

    Write-Ok "Bootstrap среды завершён"
    Finish-Script -State "SUCCESS" -Message "Bootstrap выполнен успешно." -ExitCode 0
}
catch {
    $errorMessage = $_.Exception.Message
    Write-Host ""
    Write-Host ("[ERROR] " + $errorMessage) -ForegroundColor Red
    Finish-Script -State "FAILED" -Message $errorMessage -ExitCode 1
}
