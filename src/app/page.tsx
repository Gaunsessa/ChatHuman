'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Chat } from './chat';

export default function Home() {
  const [wrongCount, setWrongCount] = useState(0);
  const [racer, setRacer] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const canShake = useRef(true);
  const maxAnger = 6;

  const router = useRouter();

  function angryAction() {
    setWrongCount(prev => {
      const updated = prev + 1;
      const memes = ['Angry meme.mp3'];
      const selectedMeme = memes[Math.floor(Math.random() * memes.length)];
      new Audio(selectedMeme).play();

      if (updated >= maxAnger) {
        setShowExplosion(true);

        setTimeout(() => {
          setShowExplosion(false);
          if (!hasRedirected) {
            setHasRedirected(true);
            router.push('/not-found');
          }
        }, 4000);

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
    setWrongCount(prev => {
      const decreased = prev - 1;
      return decreased < 0 ? 0 : decreased;
    });

    const el = wrapperRef.current;
    if (!el || !canShake.current) return;

    canShake.current = false;

    const sounds = [
      'Oh my god! Wow! - Meme (mp3cut.net).mp3',
      'Oh my god!.mp3',
      'Yippee Sound Effect.mp3'
    ];
    
    const selectedSound = sounds[Math.floor(Math.random() * sounds.length)];
    new Audio(selectedSound).play();

    el.classList.add("accept");

    const handleAnimationEnd = () => {
      el.classList.remove("accept");
      canShake.current = true;
      el.removeEventListener("animationend", handleAnimationEnd);
    };

    el.addEventListener("animationend", handleAnimationEnd);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const backgroundOverlayOpacity = Math.min(wrongCount / maxAnger, 0.5);
  
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        className="fixed bottom-0 left-0 w-full z-0 transition-all duration-500 ease-out pointer-events-none"
        style={{
          height: `${(wrongCount / maxAnger) * 100}vh`,
          background: 'linear-gradient(to top, rgba(255, 66, 66, 0.2), transparent)'
        }}
      />

      <div
        className="relative flex flex-col items-center justify-center min-h-screen z-10"
        ref={wrapperRef}
      >
        <div className="max-w-4xl m-2">
          <div className="flex justify-center items-center">
            <img src="/Assets/ChatHumanTitle.gif" alt="" className="p-5 object-centre" style={{ imageRendering: "pixelated" } as any} />
          </div>
          <Chat racer={racer} happyAction={happyAction} angryAction={angryAction} />
      
          <div className="fixed bottom-2 left-2">
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

      <input type="text" className='hidden' ref={inputRef}/>
    </div>
  );
}
