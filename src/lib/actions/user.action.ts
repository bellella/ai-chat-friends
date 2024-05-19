'use server';
import { redirect } from "next/navigation";
import { createUser } from "../data/user.data";
import { Gender } from "@/types";

export async function signUp(email: string, formData: FormData) {
    // TODO validation logic
    const gender = formData.get('gender') as Gender;
    createUser({
        email,
        name: formData.get('name')?.toString(),
        gender,
    });
    redirect('/sign/signin');
}