import prisma from "../db/prisma";
import { Friend } from "@prisma/client";

/**
 * Get a friend by id
 */
export async function getFriendById(id: string): Promise<Friend | null> {
    return prisma.friend.findFirst({where: {id}});
}
/**
 * Get friend list
 */
export async function getFriends(keyword: string): Promise<Friend[]> {
    const friends = keyword ? await prisma.friend.findMany({where: {name: keyword}}): await prisma.friend.findMany();
    return friends;
}
