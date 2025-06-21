import { TextBox } from "./textBox";

export default function Home() {
  async function fetchData() {
    'use server';

    const SYSTEM_PROMPT = `
You are a person, speaking to a chatbot. You should ask questions.
Pretend you are a typical person speaking to an LLM. 
Do not be nice. Do not be coy.

Don't have greetings like Hey or Yo.

Maybe even be a little rude.

Do not write too much. You are a typical person not poet.

Do not use much punctuation.

Just ask a question.

Have variety in your questions.

Be kinda dumb.

Examples: 
  * Please solve this leetcode ...
  * What is the capital of France?
  * How do I make a cake?
  * Please explain quantum computing in simple terms.
  * Solve this math problem: 2 + 2.
`;

  let output = "";

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
          content: SYSTEM_PROMPT 
        }],
        stream: true,
      }),
    });

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Append new chunk to buffer
        buffer += decoder.decode(value, { stream: true });

        // Process complete lines from buffer
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
              if (content) {
                console.log(content);

                output += content;
              }
            } catch (e) {
              // Ignore invalid JSON
            }
          }
        }
      }
    } finally {
      reader.cancel();

      console.log("BUFFER:", output);

      return output;
    }



  }

// function handleFetch() {
//   'use client';

//   fetchData()
//     .then(data => console.log('Fetched data:', data))
//     .catch(error => console.error('Error fetching data:', error));
// }

return (
  <div className="bg-white">
    {/*<button>{fetchData()}</button>*/}
    <TextBox />
  </div>
);
}
