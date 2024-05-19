import SubPage from "@/components/common/subpage";
import ChatBoxSkeleton from "../_components/ChatBoxSkeleton";

export default function Loading() {
    return <SubPage title="" className="max-w-[500px] mx-auto mt-5">
        <div className="mx-auto max-w-md relative">
            <ChatBoxSkeleton />
        </div>
    </SubPage>
}