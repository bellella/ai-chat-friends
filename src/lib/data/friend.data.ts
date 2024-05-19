import dbConnect from "@/lib/db/dbConnect";
import { Friend } from "@/types";
import FriendModel from "../db/models/Friend.model";

/**
 * Get a friend by id
 */
export async function getFriendById(id: string): Promise<Friend | null> {
    await dbConnect;
    return FriendModel.findById(id);
}
/**
 * Get friend list
 */
export async function getFriends(keyword: string): Promise<Friend[]> {
    await dbConnect;
    const friends = keyword ? await FriendModel.find({name: keyword}): await FriendModel.find();
    return friends;
}
