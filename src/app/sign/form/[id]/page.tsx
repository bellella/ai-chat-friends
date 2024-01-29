import { useFormStatus } from "react-dom";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch('http://localhost:3000/api/user/signin/temp?id='+params.id, {
    method: "GET",
  });
  const {user} = await response.json();

  const submit = async (formData: FormData) => {
    'use server';

    const data = {
      email: user.email,
      name: formData.get('name'),
      gender: formData.get('gender'),
    }
    const res = await fetch('http://localhost:3000/api/user/signup', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    console.log(await res.json(),'sign up~~~')
  }
  
  return (
    <form action={submit} className="max-w-lg mx-auto">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <div className="mt-10">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="first-name"
                  autoComplete="given-name"
                  defaultValue={user.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>
            <div>
              <label htmlFor="
  "></label>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                  Gender
                </label>
                <div className="flex gap-5">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="gender"
                      value="female"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                      Female
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="gender"
                      value="male"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                      Male
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="gender"
                      value="other"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                      Other
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

<button className="mt-5 bg-pink-500 rounded p-2 px-3 w-full">Sign up!</button>



        </div>
      </div>
    </form>
  )
}

