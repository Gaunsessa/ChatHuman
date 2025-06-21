export function UserText({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className= "inline-block p-4 m-2 rounded-xl bg-[#e9e9e9]" >
        <p className="text-sm text-gray-700">{text}</p>
      </div>
    </div>
  );
}