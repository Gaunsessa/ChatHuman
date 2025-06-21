import { useEffect, useState, useRef } from "react";
import { LlmText } from "./llmText";

export function LlmInput({
   onSubmit,
   showCursor,
   ref
}: {
   onSubmit: (text: string) => boolean;
   showCursor: boolean;
}) {
   const [text, setText] = useState('');
   const textRef = useRef(text);

   useEffect(() => {
      textRef.current = text;
   }, [text]);

   useEffect(() => {
      function handleKeyDown(event: KeyboardEvent) {
         if (!showCursor) return;

         if (event.key === 'Enter') {
            console.log(textRef.current);

            if (textRef.current !== '') {
               if (onSubmit(textRef.current))
                  setText('');
            }
         } else if (event.key.length === 1) {
            setText(prev => prev + event.key);
         }
      }

      document.addEventListener('keydown', handleKeyDown);
      
      return () => document.removeEventListener('keydown', handleKeyDown);
   }, []);

   return <div className="flex" ref={ref}>
      <div className="flex p-4 m-2 flex-row">
         <p className="text-sm text-gray-800 whitespace-pre">{text}</p>
         <p className={`text-sm text-gray-800 ${showCursor ? 'animate-pulse' : 'opacity-0'}`}>|</p>
      </div>
   </div>
}
