import { useEffect, useState, useRef } from "react";
import { LlmText } from "./llmText";

export function LlmInput({
   onSubmit,
}: {
   onSubmit: (text: string) => void;
}) {
   const [text, setText] = useState('');
   const textRef = useRef(text);

   useEffect(() => {
      textRef.current = text;
   }, [text]);

   useEffect(() => {
      function handleKeyDown(event: KeyboardEvent) {
         console.log(event.key);

         if (event.key === 'Enter') {
            console.log(textRef.current);

            if (textRef.current !== '') {
               onSubmit(textRef.current);
               setText('');
            }
         } else if (event.key.length === 1) {
            setText(prev => prev + event.key);
         }
      }

      document.addEventListener('keydown', handleKeyDown);
      
      return () => document.removeEventListener('keydown', handleKeyDown);
   }, []);

   return <LlmText text={text} />;
}
