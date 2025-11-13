"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [userMessage, setUserMessage] = useState(""); // user input
  const [response, setResponse] = useState("");       // AI response

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.text();
    setResponse(data);
    setUserMessage(""); // clear input after send
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">💬 Hello I AM Kuldeep</h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow p-4">
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded-lg"
            rows={3}
            placeholder="Type your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
        </div>

        <button
          onClick={handleSend}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>

        {response && (
          <div className="mt-4 p-3 border rounded-lg bg-gray-50 text-gray-800 prose">
            <strong>Bot:</strong>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {response}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
