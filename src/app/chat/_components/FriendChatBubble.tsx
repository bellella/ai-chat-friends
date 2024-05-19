import Avatar from "@/components/common/avatar";

export default function FriendChatBubble({ children, avatarImage }: React.PropsWithChildren<{ avatarImage: string }>) {
    return <div
        className="flex gap-3"><Avatar image={avatarImage} />
        <div className="max-w-[80%] bg-purple-100 rounded rounded-e-xl rounded-es-xl p-2">
            <p>{children}</p>
        </div>
    </div>
}