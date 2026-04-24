export function DotLoader({ message = "Loading" }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      
      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
        <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
      </div>

      <p className="mt-4 text-gray-600 text-sm">
        {message}
      </p>
    </div>
  );
}