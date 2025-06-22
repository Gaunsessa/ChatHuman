"use client";

import { useEffect, useRef, useState } from "react";
import { Chat } from "./chat";
import InfoButton from "@/components/infoButton";

export default function Home() {
  const [wrongCount, setWrongCount] = useState(0);
  const [showEnd, setShowEnd] = useState(false);

  const [racer, setRacer] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const canAnimate = useRef(true);
  const maxAnger = 6;

  function triggerAnimation(name: string) {
    const el = wrapperRef.current;
    if (!el || !canAnimate.current) return;

    canAnimate.current = false;
    el.classList.add(name);

    const handleAnimationEnd = () => {
      el.classList.remove(name);
      canAnimate.current = true;
      el.removeEventListener("animationend", handleAnimationEnd);
    };

    el.addEventListener("animationend", handleAnimationEnd);
  }

  function triggerAudio(srcs: string[]) {
    if (srcs.length === 0) return;

    const selectedSrc = srcs[Math.floor(Math.random() * srcs.length)];
    const audio = new Audio(selectedSrc);

    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }

  function angryAction() {
    setWrongCount((prev) => {
      let updated = prev + 1;

      const memes = ["Angry meme.mp3"];

      const selectedMeme = memes[Math.floor(Math.random() * memes.length)];
      new Audio(selectedMeme).play();

      if (updated % 4 == 0) {
        setShowEnd(true);

        setTimeout(() => setShowEnd(false), 4000);
      }

      return Math.max(updated, maxAnger);
    });

    triggerAnimation("shake");
  }

  function happyAction() {
    setWrongCount((prev) => {
      const decreased = prev - 1;
      return decreased < 0 ? 0 : decreased;
    });

    triggerAudio([
      "Oh my god! Wow! - Meme (mp3cut.net).mp3",
      "Oh my god!.mp3",
      "Yippee Sound Effect.mp3",
    ]);

    triggerAnimation("accept");
  }

  useEffect(() => {
    document.addEventListener(
      "touchend",
      (event) => {
        event.preventDefault();

        inputRef.current?.focus();
      },
      { passive: false },
    );
  }, []);

  const backgroundOverlayOpacity = Math.min(wrongCount / maxAnger, 0.5);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        className="relative flex flex-col items-center justify-center min-h-screen"
        ref={wrapperRef}
      >
        <div className="max-w-4xl m-2">
          <div className="flex justify-center items-center">
            <img
              src="/Assets/ChatHumanTitle.gif"
              alt=""
              className="p-5 object-centre"
              style={{ imageRendering: "pixelated" } as any}
            />
          </div>
          <Chat
            racer={racer}
            happyAction={happyAction}
            angryAction={angryAction}
          />
        </div>
      </div>

      <div className="fixed bottom-4 left-4">
        <p
          onClick={() => setRacer((prev) => !prev)}
          className="flex flex-row items-center rounded-xl bg-gray-100 text-gray-700 px-4 py-2 hover:bg-gray-200 transition hover:cursor-pointer"
        >
          Assist Mode
          <input
            type="checkbox"
            onChange={() => setRacer((prev) => !prev)}
            checked={racer}
            className="ml-1 w-4 h-4 appearance-none bg-[#d8d8d8] rounded checked:bg-[#898989]"
          />
        </p>
      </div>

      <input
        type="text"
        className="text-transparent border-0 focus:outline-none"
        ref={inputRef}
      />

      <div className="fixed bottom-4 right-4">
        <InfoButton />
      </div>

      <div
        className="fixed bottom-0 left-0 w-full z-0 transition-all duration-500 ease-out pointer-events-none"
        style={{
          height: `${(wrongCount / maxAnger) * 100}vh`,
          background:
            "linear-gradient(to top, rgba(255, 66, 66, 0.2), transparent)",
        }}
      />

      {showEnd && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000066] z-50">
          <img
            src="/cat.gif"
            alt="Explosion"
            className="w-140 h-auto rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
