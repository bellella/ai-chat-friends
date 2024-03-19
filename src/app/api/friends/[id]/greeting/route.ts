import { auth } from "@/app/api/auth/[...nextauth]/auth";
import dbConnect from "@/lib/db/dbConnect";
import ChatHistory from "@/lib/db/models/ChatHistory";
import Friend from "@/lib/db/models/Friend";

/**
 * Send friend greet to user
 */
export async function POST(req: Request, {params: {id}} : {params: {id: string}}) {
    const {user} = await auth();
    const userId = user.id;
    await dbConnect();
    const {greeting} = await Friend.findById(id);
    const history = await ChatHistory.create({role: 'assistant', friendId: id, userId, content: greeting});
    return Response.json({greeting});
}
