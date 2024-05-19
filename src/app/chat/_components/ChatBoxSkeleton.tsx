export default function ChatBoxSkeleton() {
    return <div className="absolute left-0 top-0 bg-white border border-gray-100 rounded-lg p-4 w-full mx-auto">
      <div className="animate-pulse">
        <div className="px-5 py-3 flex gap-4 items-center border-b">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="h-3 bg-slate-200 rounded rounded-lg w-20"></div>
        </div>
        <div className="h-[400px] p-5">
          <div
            className={`flex gap-5`}>
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 w-[80%] bg-gray-100 rounded rounded-e-xl rounded-es-xl p-2">
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-slate-100 h-10 w-full"></div>
      </div>
    </div>
  }
  