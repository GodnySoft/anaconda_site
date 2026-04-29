import Head from "next/head";

import { PublicSiteLayout } from "../components/PublicSiteLayout";
import { ContactSection } from "../components/sections/ContactSection";

export default function ContactsPage() {
  return (
    <>
      <Head>
        <title>Контакты ОСНОВА ИТ — ANACONDA</title>
        <meta
          name="description"
          content="Свяжитесь с ОСНОВА ИТ, чтобы заказать бесплатный аудит процессов и внедрение платформы ANACONDA."
        />
      </Head>
      <PublicSiteLayout>
        <ContactSection />
      </PublicSiteLayout>
    </>
  );
}