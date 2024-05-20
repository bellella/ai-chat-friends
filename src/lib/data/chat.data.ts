import dbConnect from "@/lib/db/dbConnect";
import ChatMessageModel from "@/lib/db/models/ChatMessage.model";
import { getUserId } from "./user.data";
import FriendModel from "../db/models/Friend.model";
import prisma from "../db/prisma";
import { ChatMessage } from "@prisma/client";

/**
 * Get chat messages of a user
 */
export async function getChatMessages(friendId: string): Promise<ChatMessage[]> {
    const userId = await getUserId();
    return prisma.chatMessage.findMany({where: {friendId, userId}});
}

/**
 * Create chat messages
 */
export async function createChatMeesages(messages: any[]) {
    return prisma.chatMessage.createMany({data: messages});
}

export async function createFriendGreetMessage(friendId: string): Promise<ChatMessage> {
    const userId = await getUserId();
    const {greeting} = await FriendModel.findById(friendId);
    return prisma.chatMessage.create({data: {role: 'assistant', friendId, userId, content: greeting}});
}