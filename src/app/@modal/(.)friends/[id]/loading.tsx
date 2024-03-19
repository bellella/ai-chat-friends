export default async function Loading() {
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full border-8 border-gray-300 border-t-8 border-blue-500 h-14 w-14"></div>
                <p className="mt-4 text-gray-100">Loading...</p>
            </div>
        </div>
    );
}