"use client";

import { useEffect, useState } from "react";

import { UserText, LlmText, UserLoadingText } from "@/components/chatText";
import { LlmInput, LlmInputTyperacer } from "@/components/llmInput";

import { Message, requestCompletion } from "@/llm";

function MessageBox({ message }: { message: Message }) {
  switch (message.role) {
    case "assistant":
      return <UserText text={message.content} />;
    case "user":
      return <LlmText text={message.content} />;
    case "system":
      return null;
    default:
      return null;
  }
}

export function Chat({
  racer,
  angryAction,
  happyAction,
}: {
  racer: boolean;
  angryAction: () => void;
  happyAction: () => void;
}) {
  const [generating, setGenerating] = useState(false);
  const [messages, setMessages] = useState([] as Message[]);

  const [showScrollButton, setShowScrollButton] = useState(false);

  function scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }

  async function updateState() {
    if (generating) return;

    setGenerating(true);

    const newMessages = await requestCompletion(messages);

    setMessages(newMessages);

    const lastMessage = newMessages.at(-1);

    if (lastMessage?.happy) happyAction();

    if (lastMessage?.angry) angryAction();

    setGenerating(false);
  }

  function sendMessage(text: string) {
    if (generating) return false;

    setMessages((prev) => [...prev, { role: "user", content: text }]);

    return true;
  }

  useEffect(() => {
    if (messages.at(-1)?.role !== "assistant") {
      updateState();
    }

    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    function handleScroll() {
      const threshold = 150;
      const distanceFromBottom =
        document.documentElement.scrollHeight -
        window.innerHeight -
        window.scrollY;

      setShowScrollButton(distanceFromBottom > threshold);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex-1 justify-end relative">
      {messages.map((message, index) => (
        <MessageBox key={index} message={message} />
      ))}

      {generating && <UserLoadingText />}

      {racer && (
        <LlmInputTyperacer
          onSubmit={sendMessage}
          showCursor={!generating}
          messages={messages}
        />
      )}

      {!racer && <LlmInput onSubmit={sendMessage} showCursor={!generating} />}

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-100 text-black px-4 py-2 rounded-xl hover:bg-gray-200 transition hover:cursor-pointer"
        >
          👇
        </button>
      )}
    </div>
  );
}
