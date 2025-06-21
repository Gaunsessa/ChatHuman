import { Chat } from './chat';

export default function Home() {

  return (
    <div className="bg-white max-w-4xl m-2">
      <div className='flex flex-1 justify-center align-center items-center'>
        <img src="/Assets/ChatHumanFull.png" alt="" className="p-5 object-centre" style={{ imageRendering: "pixelated" } as any} />
      </div>
      <Chat />
    </div>
  );
}
