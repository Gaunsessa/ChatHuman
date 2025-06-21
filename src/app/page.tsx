'use client';

import { useRef } from 'react';
import { Chat } from './chat';

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const canShake = useRef(true);

  function shakeAction() {
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

  function acceptAction() {
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
    <div className='flex flex-1 justify-center' ref={wrapperRef}>
      <div className="max-w-4xl m-2">
        <div className='flex flex-1 justify-center align-center items-center'>
          <img src="/Assets/ChatHumanFull.png" alt="" className="p-5 object-centre" style={{ imageRendering: "pixelated" } as any} />
        </div>
        <Chat happyAction={acceptAction} angryAction={shakeAction}/>
      </div>
    </div>
  );
}
