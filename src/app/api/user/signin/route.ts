import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    await dbConnect();
    const user = await User.findOne({
        email: body.email
    });
    let status: 'OK' | 'NOT_USER' = 'NOT_USER';
    if (user) {
        status = 'OK';
    }
    return Response.json({ user, status })
}