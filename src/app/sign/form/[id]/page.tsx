import SubPage from "@/components/common/subpage";
import RadioGroup from "@/components/form/radio-group";
import TextInput from "@/components/form/text-input";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(process.env.SERVER_URL+'/api/user/signin/temp?id=' + params.id, {
    method: "GET",
  });
  const { user } = await response.json();

  const submit = async (formData: FormData) => {
    'use server';

    const data = {
      email: user.email,
      name: formData.get('name'),
      gender: formData.get('gender'),
    }
    const res = await fetch(process.env.SERVER_URL+'/api/user/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      cache: 'no-store'
    });
    const ress = await res.json();
    redirect('/sign/signin');
  }

  return (
    <SubPage className="max-w-lg" title="Sign Up">
      <form action={submit} className="mt-10">
        <TextInput label="Name" name="name" defaultValue={user.name} />
        {/* <Textarea label="Description" name="description" rows={3}/> */}
        <RadioGroup
          name="gender"
          options={[
            { label: 'Femail', value: 'F' },
            { label: 'Male', value: 'M' },
            { label: 'Other', value: 'O' },
          ]} selectedOption="F" />
        <button className="button-primary mt-5">Sign up!</button>
      </form>
    </SubPage>
  )
}

