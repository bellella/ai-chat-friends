import dbConnect from "@/lib/db/dbConnect";
import Friend from "@/lib/db/models/Friend";
import { NextRequest } from "next/server";

/**
 * Send a friend list
 */
export async function GET(req: NextRequest) {
    const keyword = req.nextUrl.searchParams.get('search');
    await dbConnect();
    const friends = keyword !== 'undefined' ? await Friend.find({name: keyword}): await Friend.find();
    return Response.json({friends})
}
