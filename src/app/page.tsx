import { Chat } from './chat';

export default function Home() {

return (
  <div className="bg-white max-w-4xl m-2">
    <div className='flex flex-1 justify-center align-center items-center'>
      <img src="/Assets/ChatHuman.png" alt="" className="size-25 p-5 object-centre"/>
      <h1 className='text-5xl'>
        ChatHuman
      </h1>
    </div>
    <Chat />
  </div>
);
}
