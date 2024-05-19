import dbConnect from "@/lib/db/dbConnect";
import ChatMessageModel from "@/lib/db/models/ChatMessage.model";
import { ChatMessage } from "@/types";
import { getUserId } from "./user.data";
import FriendModel from "../db/models/Friend.model";

/**
 * Get chat messages of a user
 */
export async function getChatMessages(friendId: string): Promise<ChatMessage[]> {
    const userId = await getUserId();
    await dbConnect;
    return ChatMessageModel.find({friendId, userId});
}

/**
 * Create chat messages
 */
export function createChatMeesages(messages: Partial<ChatMessage>[]) {
    return ChatMessageModel.create(messages);
}

export async function createFriendGreetMessage(friendId: string): Promise<ChatMessage> {
    await dbConnect;
    const userId = await getUserId();
    const {greeting} = await FriendModel.findById(friendId);
    return ChatMessageModel.create({role: 'assistant', friendId, userId, content: greeting});
}