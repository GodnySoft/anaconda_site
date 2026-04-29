import Head from "next/head";

import DemoWorkspace from "../components/DemoWorkspace";

export default function DemoPage() {
  return (
    <>
      <Head>
        <title>Demo — ANACONDA</title>
        <meta name="description" content="Черновой demo-маршрут ANACONDA." />
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-center text-2xl font-bold">Так выглядит работа внутри ANACONDA</h1>
        <p className="mb-8 text-center text-slate-300">
          Один экран, где менеджер видит клиента, историю общения, счета, оплату и следующие действия.
        </p>
        <DemoWorkspace />
      </div>
    </>
  );
}