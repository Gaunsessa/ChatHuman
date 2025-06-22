'use server'

import 'server-only';

import { ANGRY_TOKEN, HAPPY_TOKEN, SYSTEM_PROMPT } from "./systemPrompt";

export type Message = {
   role: 'user' | 'assistant' | 'system';
   content: string;
   happy?: boolean;
   angry?: boolean;
};

export async function requestCompletion(messages: Message[]): Promise<Message[]> {
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

   let data = await response.json();
   data = data.choices[0].message.content;

   console.log(data);

   return [
      ...messages,
      { 
         role: 'assistant', 
         content: data.replace(HAPPY_TOKEN, '').replace(ANGRY_TOKEN, ''), 
         happy: data.includes(HAPPY_TOKEN),
         angry: data.includes(ANGRY_TOKEN),
      }
   ];
}
