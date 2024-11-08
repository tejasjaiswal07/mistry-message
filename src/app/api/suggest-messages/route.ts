import OpenAI from 'openai';
import { OpenAIStream } from 'ai';
import { NextResponse } from 'next/server';

// Configure runtime for Edge
export const runtime = 'edge';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define prompt type for better type safety
interface PromptRequest {
  messages?: Array<{ role: 'system' | 'user' | 'assistant'; content: string; name?: string }>;
}

export async function POST(req: Request) {
  try {
    // Default prompt for generating questions
    const defaultPrompt = {
      role: "system",
      content: "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform and should be suitable for a diverse audience. Focus on universal themes that encourage friendly interaction.",
      name: "system"
    };

    // Parse request body or use default
    let messages;
    try {
      const body = (await req.json()) as PromptRequest;
      messages = body.messages || [defaultPrompt];
    } catch {
      messages = [defaultPrompt];
    }

    // Create completion with latest model
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: messages.map(message => ({ ...message, name: message.name || '', role: message.role as 'system' | 'user' | 'assistant' })),
      temperature: 0.7,
      max_tokens: 400,
      stream: true,
    });

    // Create and return stream
    const stream = OpenAIStream(response);
    return new Response(stream);

  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, message, status } = error;
      return NextResponse.json(
        { error: { name, message, status } },
        { status: status || 500 }
      );
    }

    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { message: "An unexpected error occurred" } },
      { status: 500 }
    );
  }
}