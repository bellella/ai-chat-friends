import dbConnect from "@/lib/db/dbConnect";
import UserTemp from "@/lib/db/models/UserTemp";
import { NextRequest } from "next/server";

/**
 * insert temp user for the sign up later
 */
export async function POST(req: NextRequest) {
    const body = await req.json();
    const {email, name, description, gender} = body;
    await dbConnect();
    const user = await UserTemp.create({
        email,
        name,
        description,
        gender
    });
    return Response.json({user})
}

/**
 * get temp user for a sign up form
 */
export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    await dbConnect();
    const user = await UserTemp.findById(id);
    console.log(user,'usersuerusuer!!')
    return Response.json({user})
}