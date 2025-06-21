export function LlmText({ text }: { text: string }) {
  return (
    <div className="flex">
      <div className="inline-block p-4 m-2">
        <p className="text-sm text-gray-800 whitespace-pre">{text}</p>
      </div>
    </div>
  );
}