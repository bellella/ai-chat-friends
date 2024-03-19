import { useForm } from "react-hook-form";

export default function SearchBar() {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submit = async (search: string) => {
    }

    return (
        <form onSubmit={handleSubmit(data => submit(data.search))}>
            {/* <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                </div>
                <input {...register("search", { required: true })} type="search" id="search" name="search" value={search} 
                className="block w-full p-4 ps-10 text-sm text-gray-900 border
                 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
                 outline-none dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white
                   dark:focus:border-blue-500" placeholder="Search" required />

            </div> */}
        </form>)
}