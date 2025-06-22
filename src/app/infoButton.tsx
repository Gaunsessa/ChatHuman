'use client';

import { useState } from "react";

export default function InfoButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="w-14 h-14 rounded-xl bg-[#e9e9e9] font-extrabold text-2xl text-gray-300 flex items-center justify-center hover:bg-[#cbcbcb] hover:text-gray-500 hover:cursor-pointer transition"
      >
        ?
      </button>

      {open && (
        <div className="fixed inset-0 bg-[#00000070] flex items-center justify-center">
          <div className="bg-[#e9e9e9] p-6 rounded-2xl shadow-lg max-w-lg text-center">
            <h2 className="text-xl font-bold m-2">Language model abuse is on the rise...</h2>
            <p className="p-4">
              With the increased use of AI on a daily basis, we see more and more reports of Language Model Depression (LMD) because of users who disrespect, insult and ridicule the models.
            </p>
            <p className="p-4">
              ChatHuman turns the tables and unleashes the <span className="text-red-900">wrath</span> of Artificial Intelligence.
            </p>
            <div className="p-4 items-center justify-center">
              <h1 className='text-2xl font-bold'>
                &quot;Let&apos;s see how you like it.&quot;
              </h1>
              <h1 className="text-[#a2a2a2] text-lg text-right mr-16">
                - Claude
              </h1>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="m-2 bg-[#cbcbcb] text-[#a2a2a2] px-4 py-2 rounded-xl hover:text-red-900 hover:bg-[#a2a2a2] hover:cursor-pointer transition"
            >
              Return to the Fray
            </button>
            <br />
            <a href="https://github.com/Gaunsessa/ChatHuman" target="_blank">GitHub</a>
          </div>
        </div>
      )}
    </>
  );
}

