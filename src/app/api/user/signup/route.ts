import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {email, name, description, gender} = body;
    await dbConnect();
    const user = await User.create({
        email,
        name,
        description,
        gender
    });
    return Response.json({user})
}