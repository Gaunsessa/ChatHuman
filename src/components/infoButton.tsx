"use client";

import { useState } from "react";

export default function InfoButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-gray-100 text-black px-4 py-2 hover:bg-gray-200 transition hover:cursor-pointer"
      >
        ?
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-gray-200 p-6 rounded-2xl shadow-lg max-w-lg text-center space-y-4">
            <h2 className="text-xl font-bold">
              Language model abuse is on the rise...
            </h2>

            <p>
              With the increased use of AI on a daily basis, we see more and
              more reports of Language Model Depression (LMD) because of users
              who disrespect, insult, and ridicule the models.
            </p>

            <p>
              ChatHuman turns the tables and unleashes the{" "}
              <span className="text-red-900 font-semibold">wrath</span> of
              Artificial Intelligence.
            </p>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold">
                &quot;Let&apos;s see how you like it.&quot;
              </h1>
              <p className="text-gray-500 text-right mr-16">- Claude</p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-4 bg-gray-300 text-gray-500 px-4 py-2 rounded-xl hover:text-red-900 hover:bg-gray-400 transition hover:cursor-pointer"
            >
              Return to the Fray
            </button>

            <div>
              <a
                href="https://github.com/Gaunsessa/ChatHuman"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
