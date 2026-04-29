param(
    [ValidateSet('syntax', 'status', 'deploy', 'rollback')]
    [string]$Action = 'status',
    [string]$Inventory = 'infra/ansible/inventory',
    [string]$Ref = 'main',
    [string]$ReleaseId = '',
    [string]$WslDistro = 'Ubuntu',
    [string]$ProjectPath = '/mnt/g/OSNOVA/soft/anaconda_site'
)

$playbook = 'infra/ansible/deploy.yml'

switch ($Action) {
    'syntax' {
        $command = "cd '$ProjectPath' && ansible-playbook --syntax-check $playbook -i $Inventory"
    }
    'status' {
        $command = "cd '$ProjectPath' && ansible-playbook $playbook -i $Inventory -e deployment_action=status"
    }
    'deploy' {
        $releaseArg = if ($ReleaseId) { " -e release_id=$ReleaseId" } else { '' }
        $command = "cd '$ProjectPath' && ansible-playbook $playbook -i $Inventory -e deployment_action=deploy -e deployment_ref=$Ref$releaseArg"
    }
    'rollback' {
        if (-not $ReleaseId) {
            throw 'Для rollback необходимо передать -ReleaseId <release-id>'
        }
        $command = "cd '$ProjectPath' && ansible-playbook $playbook -i $Inventory -e deployment_action=rollback -e rollback_release_id=$ReleaseId"
    }
}

Write-Host "WSL command: $command"
wsl.exe -d $WslDistro bash -lc $command
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}