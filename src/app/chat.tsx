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
   const [messages, setMessages] = useState([] as message[]);
   const inputRef = useRef(null);

   async function updateState() {
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
               content: SYSTEM_PROMPT,
            }, ...messages],
         }),
      });

      const data = await response.json();

      setMessages(prev => ([
         ...prev,
         { role: 'assistant', content: data.choices[0].message.content }
      ]));
   }

   function sendMessage(text: string) {
      setMessages(prev => {
         const res = [
            ...prev,
            { role: 'user', content: text }
         ];

         return res as any;
      });
   }

   useEffect(() => {
      if (messages.at(-1)?.role !== 'assistant')
         updateState();

   }, [messages]);

   return (
      <div className="flex-1 justify-end">
         {messages.map((message: any, index: number) => (
            <Message key={index} message={message} />
         ))}
         <LlmInput onSubmit={sendMessage}/>
      </div>
   );
}