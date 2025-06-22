'use server'

import 'server-only';

import { ANGRY_TOKEN, HAPPY_TOKEN, SYSTEM_PROMPT } from "./systemPrompt";

export type Message = {
   role: 'user' | 'assistant' | 'system';
   content: string;
   happy?: boolean;
   angry?: boolean;
};

export async function streamCompletion(prompt: string): Promise<AsyncGenerator<string>> {
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
            content: prompt,
         }],
         stream: true,
      }),
   });

   const reader = response.body?.getReader();

   return (async function* () {
      if (!reader)
         return '';

      const decoder = new TextDecoder();
      let buffer = '';
      try {
         while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            while (true) {
               const lineEnd = buffer.indexOf('\n');
               if (lineEnd === -1) break;

               const line = buffer.slice(0, lineEnd).trim();

               buffer = buffer.slice(lineEnd + 1);

               if (line.startsWith('data: ')) {
                  const data = line.slice(6);

                  if (data === '[DONE]') break;

                  try {
                     const parsed = JSON.parse(data);
                     const content = parsed.choices[0].delta.content;

                     if (content)
                        yield content;

                  } catch (e) { }
               }
            }
         }
      } finally {
         reader.cancel();
      }
   })();
}

export async function requestCompletion(messages: Message[]): Promise<Message[]> {
   let data: any = await streamCompletion(SYSTEM_PROMPT + messages.map(m => {
      return `${m.role === 'user' ? 'Assistant' : 'You'}: ${m.content}`;
   }).join('\n'));

   data = (await Array.fromAsync(data)).join('');

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
