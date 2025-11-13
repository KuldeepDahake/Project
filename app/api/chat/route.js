import { streamText, createTextStreamResponse } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const result = await streamText({
      model: openai("gpt-4o-mini"), // Free model via Vercel AI SDK
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    // ✅ Updated for latest SDK version:
    return createTextStreamResponse(result);
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Error: " + error.message, { status: 500 });
  }
}
