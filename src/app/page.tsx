"use client";

import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { ChatArea } from "@/components/ChatArea";
import { Chat } from "@/types/Chat";
import { Footer } from "@/components/Footer";

const Page = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [iaLoading, setIaLoading] = useState(false);
  const [chatActive, setChatActive] = useState<Chat>({
    id: "1",
    title: "Teste message",
    menssages: [
      { id: "10", author: "me", body: "Óla?" },
      { id: "11", author: "ai", body: "Óla, tudo bem?" },
    ],
  });

  const closeSidebar = () => {
    setSidebarOpened(false);
  };
  const openSidebar = () => {
    setSidebarOpened(true);
  };

  const handleClearConversations = () => {};

  const handleNewChat = () => {};

  const handleSendMessage = () => {};

  return (
    <main className="flex min-h-screen bg-gpt-gray">
      <Sidebar
        open={sidebarOpened}
        onClose={closeSidebar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >
        ...
      </Sidebar>
      <section className="flex flex-col w-full">
        <Header
          open={sidebarOpened}
          onOpen={openSidebar}
          title={`bla bla bla`}
          onNewChat={handleNewChat}
        />

        <ChatArea chat={chatActive} />

        <Footer 
          onSendMessage={handleSendMessage}
          disabled={iaLoading} />
      </section>
    </main>
  );
};

export default Page;
