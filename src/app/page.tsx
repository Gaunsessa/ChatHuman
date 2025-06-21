import { Chat } from './chat';

export default function Home() {

return (
  <div className="bg-white max-w-4xl m-2">
    <div className='flex flex-1 justify-center'>
      <h1 className='font-bold text-3xl'>ChatHuman</h1>
    </div>
    <Chat />
  </div>
);
}
