'use server';
import { redirect } from "next/navigation";
import { createUser } from "../data/user.data";
import { Gender } from "@/types";

export async function signUp(email: string, formData: FormData) {
    // TODO validation logic
    const gender = formData.get('gender') as Gender;
    const name = formData.get('name')?.toString();
    if(!(gender && name)) {
        return;
    }
    createUser({
        email,
        name,
        gender,
    });
    redirect('/sign/signin');
}