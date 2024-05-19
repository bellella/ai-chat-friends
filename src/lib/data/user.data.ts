import { auth } from "@/app/api/auth/[...nextauth]/auth";
import UserModel from "../db/models/User.model";
import dbConnect from "../db/dbConnect";
import UserTempModel from "../db/models/UserTemp";
import { User, UserTemp } from "@/types";

export async function getUserId() {
    const { user } = await auth();
    return user.id;
}

export async function isAuthencated() {
    const { isAuthenticated } = await auth();
    return isAuthenticated;
}

export async function getUserByEmail(email: string) {
    await dbConnect;
    const user = await UserModel.findOne({
        email
    });
    return user;
}

export async function createUserTemp(email: string, name: string): Promise<UserTemp> {
    await dbConnect;
    return UserTempModel.create({
        email,
        name,
    });
}

export async function getUserTemp(id: string): Promise<UserTemp | null> {
    await dbConnect;
    return UserTempModel.findById(id);
}

export async function createUser(user: Partial<User>): Promise<User> {
    return UserModel.create(user);
}