'use server'

import 'server-only';

import { SYSTEM_PROMPT } from "./systemPrompt";

export type Message = {
   role: 'user' | 'assistant' | 'system';
   content: string;
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

   const data = await response.json();

   return [
      ...messages,
      { role: 'assistant', content: data.choices[0].message.content }
   ];
}
