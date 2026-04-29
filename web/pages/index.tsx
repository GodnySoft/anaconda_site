import Head from "next/head";

import { PublicSiteLayout } from "../components/PublicSiteLayout";
import { AuditSection } from "../components/sections/AuditSection";
import { HeroSection } from "../components/sections/HeroSection";
import { HowItWorksSection } from "../components/sections/HowItWorksSection";
import { ImplementationTeaserSection } from "../components/sections/ImplementationTeaserSection";
import { ManagerWorkspaceSection } from "../components/sections/ManagerWorkspaceSection";
import { PainSection } from "../components/sections/PainSection";
import { SourceAggregationSection } from "../components/sections/SourceAggregationSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>ANACONDA — единое окно для продаж, коммуникаций и AI</title>
        <meta
          name="description"
          content="Платформа ОСНОВА ИТ, которая собирает Telegram, почту, звонки, 1С, Excel и старые базы в единое рабочее окно для сотрудников и руководителей."
        />
      </Head>
      <PublicSiteLayout>
        <HeroSection />
        <PainSection />
        <SourceAggregationSection />
        <ManagerWorkspaceSection />
        <HowItWorksSection />
        <ImplementationTeaserSection />
        <AuditSection />
      </PublicSiteLayout>
    </>
  );
}