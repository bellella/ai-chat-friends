import { useSession } from "next-auth/react";

export function useAuth() {
    const { data: session, status } = useSession();
    const isAuthencated = status === "authenticated";
    return {
        isAuthencated
    }
}