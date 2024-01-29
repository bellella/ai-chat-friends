import dbConnect from "@/lib/db/dbConnect";
import Friend from "@/lib/db/models/Friend";

/**
 * Send the info of the friend
 */
export async function GET(req: Request, {params: {id}} : {params: {id: string}}) {
    await dbConnect();
    const friend = await Friend.findById(id);
    return Response.json({friend});
}
