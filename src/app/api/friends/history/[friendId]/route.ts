import { auth } from "@/app/api/auth/[...nextauth]/auth";
import dbConnect from "@/lib/db/dbConnect";
import ChatHistory from "@/lib/db/models/ChatHistory";

/**
 * History of the chat with the friend
 */
export async function GET(req: Request, {params} : {params: {friendId: string}}) {
    const {user} = await auth();
    const id = user.id;
    await dbConnect();
    const history = await ChatHistory.find({friendId: params.friendId, userId: id});
    return Response.json({history});
}


/**
 * Insert the chat message with the firend
 */
// export async function POST(req: Request) {
//     const {user} = await auth();
//     await dbConnect();
//     const id = user.id;
//     const {friendId, message} = await req.json();
//     const history = await ChatHistory.create({sender: 'user',friendId, userId: id, message});
//     return Response.json({history});
// }