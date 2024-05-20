import { auth } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "../db/prisma";
import { User, UserTemp } from "@prisma/client";

export async function getUserId() {
    const { user } = await auth();
    return user.id;
}

export async function isAuthencated() {
    const { isAuthenticated } = await auth();
    return isAuthenticated;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({where: {email}})
    return user;
}

export async function createUserTemp(email: string, name: string): Promise<UserTemp> {
    return prisma.userTemp.create({data: {
        email,
        name,
    }});
}

export async function getUserTemp(id: string): Promise<UserTemp | null> {
    return prisma.userTemp.findFirst({where: {id}});
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
    return prisma.user.create({data: user});
}