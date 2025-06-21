import { useEffect, useState, useRef } from "react";

export function LlmInput({
   onSubmit,
   showCursor
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

   return <div className="flex m-6">
      <p className="text-sm text-gray-800 whitespace-pre-wrap break-all">
         {text}
         <span className={`text-black ${showCursor ? 'animate-pulse' : 'opacity-0'}`}>|</span>
      </p>
   </div>
}
