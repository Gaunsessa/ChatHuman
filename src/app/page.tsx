'use client';

import { useRef, useState } from 'react';
import { Chat } from './chat';

export default function Home() {
  const [wrongCount, setWrongCount] = useState(1);
  const [racer, setRacer] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const canShake = useRef(true);

  function angryAction() {
    setWrongCount(prev => {
      const updated = prev + 1;

      if (updated % 4 == 0) {
        setShowExplosion(true);
        setTimeout(() => setShowExplosion(false), 4000);
        return 0;
      }

      return updated;
    });

    const el = wrapperRef.current;
    if (!el || !canShake.current) return;

    canShake.current = false;

    el.classList.add("shake");

    const handleAnimationEnd = () => {
      el.classList.remove("shake");
      canShake.current = true;
      el.removeEventListener("animationend", handleAnimationEnd);
    };

    el.addEventListener("animationend", handleAnimationEnd);
  }

  function happyAction() {
    const el = wrapperRef.current;
    if (!el || !canShake.current) return;

    canShake.current = false;

    el.classList.add("accept");

    const handleAnimationEnd = () => {
      el.classList.remove("accept");
      canShake.current = true;
      el.removeEventListener("animationend", handleAnimationEnd);
    };

    el.addEventListener("animationend", handleAnimationEnd);
  }

  return (
    <div className='flex flex-1 justify-center min-h-[100vh] relative' ref={wrapperRef}>
      <div className="w-full max-w-4xl m-2">
        <div className='flex flex-1 justify-center align-center items-center'>
          <img src="/Assets/ChatHumanTitle.gif" alt="" className="p-5 object-centre" style={{ imageRendering: "pixelated" } as any} />
        </div>
        <Chat racer={racer} happyAction={happyAction} angryAction={angryAction} />
      </div>

      <div className="fixed bottom-10 left-10">
        <div className="space-x-2 absolute left-2 bottom-2">
          <p className="flex h-14 w-40 bg-[#e9e9e9] text-gray-300 rounded-xl p-4 items-center justify-center font-bold hover:text-gray-500 hover:bg-[#cbcbcb] transition">Assist Mode:
            <input
              type="checkbox"
              onChange={() => setRacer(prev => !prev)}
              className="ml-1 w-4 h-4 appearance-none bg-[#d8d8d8] rounded checked:bg-[#898989]"
            />
          </p>
        </div>
        
      </div>

      {showExplosion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <img
            src="/trump.gif"
            alt="Explosion"
            className="w-140 h-auto rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
