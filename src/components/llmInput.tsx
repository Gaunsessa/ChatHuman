import { useEffect, useState, useRef } from "react";
import { Message, streamCompletion } from "@/llm";

export function LlmInput({
  onSubmit,
  showCursor,
}: {
  onSubmit: (text: string) => boolean;
  showCursor: boolean;
}) {
  const [text, setText] = useState("");
  const textRef = useRef(text);

  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.addEventListener(
      "touchend",
      (event) => {
        event.preventDefault();

        inputRef.current?.focus();
      },
      { passive: false },
    );
  }, [divRef, inputRef]);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ([" ", "'"].includes(event.key)) event.preventDefault();

      if (!showCursor) return;

      if (event.key === "Enter") {
        if (textRef.current !== "") {
          if (onSubmit(textRef.current)) setText("");
        }
      } else if (event.key.length === 1) {
        setText((prev) => prev + event.key);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex m-6" ref={divRef}>
      <p className="text-sm text-gray-800 whitespace-pre-wrap break-all">
        {text}
        <span
          className={`text-black ${showCursor ? "animate-pulse" : "opacity-0"}`}
        >
          |
        </span>
      </p>

      <input
        type="text"
        className="text-transparent border-0 focus:outline-none caret-transparent opacity-0 h-0 w-0"
        ref={inputRef}
      />
    </div>
  );
}

export function LlmInputTyperacer({
  onSubmit,
  showCursor,
  messages,
}: {
  onSubmit: (text: string) => boolean;
  showCursor: boolean;
  messages: Message[];
}) {
  const [genText, setGenText] = useState("");
  const [text, setText] = useState("");

  const textRef = useRef(text);
  const genTextRef = useRef(genText);

  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    textRef.current = text;
    genTextRef.current = genText;
  }, [text, genText]);

  useEffect(() => {
    divRef.current?.addEventListener(
      "touchend",
      (event) => {
        event.preventDefault();

        inputRef.current?.focus();
      },
      { passive: false },
    );
  }, [divRef, inputRef]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ([" ", "'"].includes(event.key)) event.preventDefault();

      if (!showCursor) return;

      if (event.key === "Backspace") {
        setText((prev) => prev.slice(0, -1));
        return;
      }

      if (event.key === "Enter") {
        if (event.shiftKey) {
          setText((prev) => prev + "\n");
          return;
        }

        if (
          textRef.current !== "" &&
          genTextRef.current.trimEnd() === textRef.current.trimEnd()
        ) {
          if (onSubmit(textRef.current)) {
            setText("");
            setGenText("");
          }
        }
      } else if (event.key.length === 1) {
        setText((prev) => prev + event.key);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    (async () => {
      if (messages.length === 0 || messages.at(-1)?.role === "user") return;

      const SYSTEM_PROMPT = `
         Please answer this persons question. 
         Using minimal words and punctuation. 
         Make sure it is plain text no markdown! 

         If the problem requires more words you can extend your answer.

         Be a bit sassy.

         Please write about 20 words.

         CURRENT MESSAGES:
         `;

      for await (const chunk of await streamCompletion(
        SYSTEM_PROMPT +
        messages
          .map((m) => {
            return `${m.role === "user" ? "Assistant" : "You"}: ${m.content}`;
          })
          .join("\n"),
      )) {
        setGenText((prev) => prev + chunk);
      }
    })();
  }, [messages]);

  function diffText() {
    const res = [];

    for (let i = 0; i < text.length; i++) {
      res.push({
        text: text[i],
        type: text[i] == genText[i] ? "correct" : "wrong",
      });
    }

    res.push({
      text: "|",
      type: "correct",
    });

    for (let i = text.length; i < genText.length; i++) {
      res.push({
        text: genText[i],
        type: "incomplete",
      });
    }

    return res;
  }

  return (
    <div className="flex m-6" ref={divRef}>
      <p className="text-sm text-gray-800 whitespace-pre-wrap break-all">
        {diffText().map((item, index) => {
          const { text, type } = item;

          let className = "";

          if (type === "correct") className = "text-gray-800";
          else if (type === "wrong") className = "text-red-600 bg-red-100";
          else if (type === "incomplete") className = "text-gray-400";

          return (
            <span key={index} className={className}>
              {text}
            </span>
          );
        })}
      </p>

      <input
        type="text"
        className="text-transparent border-0 focus:outline-none caret-transparent opacity-0 h-0 w-0"
        ref={inputRef}
      />
    </div>
  );
}
