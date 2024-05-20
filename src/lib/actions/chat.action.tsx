import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc";

import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "langchain/schema/output_parser";
import { PromptTemplate } from "langchain/prompts";
import { getUserId } from "@/lib/data/user.data";
import { getFriendById } from "@/lib/data/friend.data";
import { createChatMeesages } from "../data/chat.data";

const initialAIState: {
    role: 'user' | 'assistant' | 'system' | 'function';
    content: string;
    id?: string;
    name?: string;
}[] = [];

const initialUIState: {
    role: 'user' | 'assistant' | 'system' | 'function';
    id: number;
    display: React.ReactNode;
}[] = [];

const TEMPLATE = `
Current conversation:
{chat_history}
Prompt:
{prompt}
User: {input}
{FriendName}:`;

async function submitUserMessage(friendId: string, content: string) {
    'use server';
    const friend = await getFriendById(friendId);
    const userId = await getUserId();

    if(!friend || !userId) {
        throw new Error('Data not sufficient for ai reuqest');
    }

    const aiState = getMutableAIState<typeof AI>();

    let text = '';
    const reply = createStreamableUI('...');

    const model = new ChatOpenAI({
        temperature: 0.8,
        modelName: "gpt-3.5-turbo-1106",
        openAIApiKey: process.env.OPENAI_KEY,
        streaming: true,
        verbose: true,
        callbacks: [
            {
                handleLLMNewToken(token: string) {
                    text += token;
                    reply.update(text);
                },
            },
        ],
    });

    const outputParser = new StringOutputParser();

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);
    const chain = prompt.pipe(model).pipe(outputParser);

    const resultContent = await chain.invoke({
        chat_history: aiState.get().map((info: any) => ({
            role: info.role,
            content: info.content,
            name: info.name,
        })).join("\n"),
        prompt: friend.prompt,
        FriendName: friend.name,
        input: content
    });
    aiState.update([
        ...aiState.get(),
        {
            role: 'user',
            content,
        },
    ]);
    reply.done();

    await createChatMeesages([
        { role: 'user', friendId, userId, content },
        { role: 'assistant', friendId, userId, content: resultContent }
    ]);

    return {
        role: 'assistant',
        id: Date.now(),
        display: reply.value,
    };
}

export const AI = createAI({
    actions: {
        submitUserMessage,
    },
    initialUIState,
    initialAIState,
});