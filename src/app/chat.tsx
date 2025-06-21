'use client';

import { useEffect, useRef, useState } from "react";

import { UserText } from "./userText";
import { SYSTEM_PROMPT } from "./systemPrompt";
import { LlmText } from "./llmText";
import { LlmInput } from "./llmInput";

type message = {
   role: 'user' | 'assistant' | 'system';
   content: string;
};

function Message({ message }: { message: message }) {
   switch (message.role) {
      case 'assistant':
         return <UserText text={message.content} />;
      case 'user':
         return <LlmText text={message.content} />;
      case 'system':
         return null;
      default:
         return null;
   }
}

export function Chat() {
   const [generating, setGenerating] = useState(false);
   const [messages, setMessages] = useState([] as message[]);

   const [showScrollButton, setShowScrollButton] = useState(false);

   const chatWrapperRef = useRef<HTMLDivElement>(null);

   const canShake = useRef(true);

   function scrollToBottom() {
      window.scrollTo({
         top: document.documentElement.scrollHeight,
         left: 0,
         behavior: 'smooth'
      });
   }

   function triggerShake() {
      const el = chatWrapperRef.current;
      if (!el || !canShake.current) return;

      canShake.current = false;

      el.classList.add("shake");

      const handleAnimationEnd = () => {
         el.classList.remove("shake");
         canShake.current = true;
         el.removeEventListener("animationend", handleAnimationEnd);
      };

      el.addEventListener("animationend", handleAnimationEnd);
   }

   async function updateState() {
      if (generating) return;

      setGenerating(true);

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
         method: 'POST',
         headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            model: 'google/gemini-2.0-flash-001',
            messages: [{ 
               role: 'system', 
               content: SYSTEM_PROMPT + messages.map(m => {
                  return `${m.role === 'user' ? 'Assistant' : 'You'}: ${m.content}`;
               }).join('\n')
            }],
         }),
      });

      const data = await response.json();

      setMessages(prev => ([
         ...prev,
         { role: 'assistant', content: data.choices[0].message.content }
      ]));

      const lastMessage = messages.at(-1);
      const uppecasePercent = (lastMessage?.content.match(/[A-Z]/g)?.length ?? 0) / (lastMessage?.content.length ?? 1) * 100;
      if (uppecasePercent > 50)
         triggerShake(); 

      setGenerating(false);
   }

   function sendMessage(text: string) {
      if (generating) return false

      setMessages(prev => [
         ...prev,
         { role: 'user', content: text }
      ]);

      return true;
   }

   useEffect(() => {
      if (messages.at(-1)?.role !== 'assistant') {
         updateState();
      }

      scrollToBottom();
   }, [messages]);
   
   useEffect(() => {
      function handleScroll() {
         const threshold = 150;
         const distanceFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

         setShowScrollButton(distanceFromBottom > threshold);
      }

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   return (
      <div ref={chatWrapperRef} className="flex-1 justify-end relative">

         {messages.map((message, index) => (
            <Message key={index} message={message} />
         ))}

         <LlmInput onSubmit={sendMessage} showCursor={!generating} />

         {showScrollButton && (
            <button
               onClick={scrollToBottom}
               className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full shadow-lg hover:bg-gray-200 transition"
            >
               👇
            </button>
         )}
      </div>
   );
}
