/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { ChatArea } from "@/components/ChatArea";
import { Chat } from "@/types/Chat";
import { Footer } from "@/components/Footer";
import { v4 as uuidv4 } from "uuid";
import { SidebarChatButton } from "@/components/SidebarChatButton";

const Page = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [iaLoading, setIaLoading] = useState(false);
  const [chatActive, setChatActive] = useState<Chat>();
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [chatActiveId, setChatActiveId] = useState<string>("");

  useEffect(() => {
    setChatActive(chatList.find((item) => item.id === chatActiveId));
  }, [chatActiveId, chatList]);

  useEffect(() => {
    if (iaLoading) getIaResponse();
  }, [iaLoading]);

  const getIaResponse = () => {
    setTimeout(() => {
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex(
        (item) => item.id === chatActiveId
      );
      if (chatIndex > -1) {
        chatListClone[chatIndex].menssages.push({
          id: uuidv4(),
          author: "ai",
          body: "Menssages da IA!",
        });
        setChatList(chatListClone);
        setIaLoading(false);
      }
    }, 2000);
  };

  const closeSidebar = () => {
    setSidebarOpened(false);
  };
  const openSidebar = () => {
    setSidebarOpened(true);
  };

  const handleClearConversations = () => {
    if (iaLoading) return;

    setChatActiveId("");
    setChatList([]);
  };

  const handleNewChat = () => {
    if (iaLoading) return;

    setChatActiveId("");
    closeSidebar();
  };

  const handleSendMessage = (message: string) => {
    if (!chatActiveId) {
      let newChatId = uuidv4();
      setChatList([
        {
          id: newChatId,
          title: message,
          menssages: [
            {
              id: uuidv4(),
              author: "me",
              body: message,
            },
          ],
        },
        ...chatList,
      ]);
      setChatActiveId(newChatId);
    } else {
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex(
        (item) => item.id === chatActiveId
      );
      chatListClone[chatIndex].menssages.push({
        id: uuidv4(),
        author: "me",
        body: message,
      });
      setChatList(chatListClone);
    }
    setIaLoading(true);
  };

  const handleSelectChat = (id: string) => {
    if (iaLoading) return;
    let item = chatList.find((item) => item.id === id);
    if (item) {
      setChatActiveId(item.id);
    }
  };

  const handleDeleteChat = (id: string) => {
    let chatListClone = [...chatList];
    let chatIndex = chatListClone.findIndex((item) => item.id === id);
    chatListClone.splice(chatIndex, 1);
    setChatList(chatListClone);
    setChatActiveId("");
    closeSidebar();
  };

  const handleEditChat = (id: string, newTitle: string) => {
    if (newTitle) {
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex((item) => item.id === id);
      chatListClone[chatIndex].title = newTitle;
      setChatList(chatListClone);
      closeSidebar();
    }
  };

  return (
    <main className="flex min-h-screen bg-gpt-gray">
      <Sidebar
        open={sidebarOpened}
        onClose={closeSidebar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >
        {chatList.map((item) => (
          <SidebarChatButton
            key={item.id}
            chatItem={item}
            active={item.id === chatActiveId}
            onClick={handleSelectChat}
            onDelete={handleDeleteChat}
            onEdit={handleEditChat}
          />
        ))}
      </Sidebar>
      <section className="flex flex-col w-full">
        <Header
          open={sidebarOpened}
          onOpen={openSidebar}
          title={chatActive ? chatActive.title : "Nova Conversa"}
          onNewChat={handleNewChat}
        />

        <ChatArea chat={chatActive} loading={iaLoading} />

        <Footer onSendMessage={handleSendMessage} disabled={iaLoading} />
      </section>
    </main>
  );
};

export default Page;
