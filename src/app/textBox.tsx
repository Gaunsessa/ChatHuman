'use client';

import { useState } from "react";



export function TextBox() {
   const [data, setData] = useState('');

   return (
      <div>
         <input type="text" className="w-full" placeholder={data}/>
         <button onClick={() => { setData("CLICKEDD"); }} className="w-full h-30">HEllo</button>
      </div>
   );
}