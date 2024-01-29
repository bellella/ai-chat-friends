import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";
import dbConnect from "@/lib/db/dbConnect";
import { auth } from "../auth/[...nextauth]/route";
import ChatHistory from "@/lib/db/models/ChatHistory";
import Friend from "@/lib/db/models/Friend";

//export const runtime = "edge";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `
Current conversation:
{chat_history}
Prompt:
{prompt}
User: {input}
AI:`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages = [], friendId, input } = body;
    const { user } = await auth();
    const userId = user.id;
    await dbConnect();

    const friend = await Friend.findById(friendId);
    const friendPrompt = friend.prompt;

    await ChatHistory.create({ role: 'user', friendId, userId, content: input });

    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOpenAI({
      temperature: 0.8,
      modelName: "gpt-3.5-turbo-1106",
      openAIApiKey: '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',
      streaming: false
    });

    const outputParser = new StringOutputParser();
    const chain = prompt.pipe(model).pipe(outputParser);

    const resultContent = await chain.invoke({
      chat_history: formattedPreviousMessages.join("\n"),
      prompt: friendPrompt,
      input: currentMessageContent,
    });
    await ChatHistory.create({ role: 'assistant', friendId, userId, content: resultContent });

    return NextResponse.json({ content: resultContent })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}