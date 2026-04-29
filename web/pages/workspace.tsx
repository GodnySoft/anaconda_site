import Head from "next/head";

import ChatWorkspace from "../components/ChatWorkspace";

export default function WorkspacePage() {
  return (
    <>
      <Head>
        <title>Workspace — ANACONDA</title>
        <meta name="description" content="Черновой маршрут рабочего пространства ANACONDA." />
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-center text-2xl font-bold">Workspace ANACONDA</h1>
        <p className="mb-8 text-center text-sm text-slate-300">
          Черновая страница рабочего пространства. Основной продуктовый приоритет сейчас — Public MVP и главная страница.
        </p>
        <ChatWorkspace />
      </div>
    </>
  );
}