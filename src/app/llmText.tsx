export function LlmText({ text }: { text: string }) {
  return (
    <div className="flex m-6">
      <p className="text-sm text-gray-800 whitespace-pre-wrap break-all">
        {text}
      </p>
    </div>
  );
}