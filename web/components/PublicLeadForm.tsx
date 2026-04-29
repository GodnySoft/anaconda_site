import { FormEvent, useMemo, useState } from "react";

type LeadFormState = {
  name: string;
  company: string;
  contact: string;
  message: string;
  consent: boolean;
};

type PublicLeadFormProps = {
  sourcePage: "home" | "contacts";
  title: string;
  description: string;
  submitLabel: string;
  successMessage: string;
};

const initialForm: LeadFormState = {
  name: "",
  company: "",
  contact: "",
  message: "",
  consent: false,
};

export function PublicLeadForm({
  sourcePage,
  title,
  description,
  submitLabel,
  successMessage,
}: PublicLeadFormProps) {
  const [form, setForm] = useState<LeadFormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const apiBaseUrl = useMemo(() => {
    const value = process.env.NEXT_PUBLIC_API_URL?.trim();
    return value && value.length > 0 ? value.replace(/\/$/, "") : "http://localhost:26800";
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!form.consent) {
      setSubmitState("error");
      setSubmitMessage("Нужно согласие на обработку данных, иначе мы не сможем принять заявку.");
      return;
    }

    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source_page: sourcePage,
        }),
      });

      if (!response.ok) {
        setSubmitState("error");
        setSubmitMessage("Не удалось отправить заявку. Проверьте поля формы и повторите попытку.");
        return;
      }

      setSubmitState("success");
      setSubmitMessage(successMessage);
      setForm(initialForm);
    } catch {
      setSubmitState("error");
      setSubmitMessage("Сервис временно недоступен. Попробуйте повторить отправку чуть позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-shell" id="contact-form">
      <div className="space-y-2">
        <p className="section-kicker">Заявка на аудит</p>
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-field">
            <span>Имя</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Иван"
              required
            />
          </label>
          <label className="form-field">
            <span>Компания</span>
            <input
              type="text"
              value={form.company}
              onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
              placeholder="ООО ПромСнаб"
            />
          </label>
        </div>

        <label className="form-field">
          <span>Телефон, Telegram или email</span>
          <input
            type="text"
            value={form.contact}
            onChange={(event) => setForm((current) => ({ ...current, contact: event.target.value }))}
            placeholder="+7..., @telegram или email"
            required
          />
        </label>

        <label className="form-field">
          <span>Комментарий</span>
          <textarea
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            placeholder="Опишите, где сейчас теряются заявки, история клиента или контроль оплат"
            rows={5}
            required
          />
        </label>

        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}
          />
          <span>Согласен на обработку данных для связи и подготовки карты внедрения.</span>
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? "Отправляем заявку..." : submitLabel}
          </button>
          <p className={`text-sm ${submitState === "error" ? "text-[#ff9f9f]" : "text-[var(--text-secondary)]"}`}>
            {submitMessage || "Ответ приходит без перезагрузки страницы. Данные формы не теряются при ошибке."}
          </p>
        </div>
      </form>
    </div>
  );
}
