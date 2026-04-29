import Head from "next/head";

import ChatbotUI from "../components/ChatbotUI";

export default function ChatbotPage() {
  return (
    <>
      <Head>
        <title>AI Chatbot — ANACONDA</title>
        <meta name="description" content="Черновой AI-маршрут ANACONDA." />
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-center text-2xl font-bold">AI Chatbot</h1>
        <ChatbotUI />
      </div>
    </>
  );
}