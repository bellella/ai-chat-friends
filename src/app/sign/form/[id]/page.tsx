import SubPage from "@/components/common/subpage";
import RadioGroup from "@/components/form/radio-group";
import TextInput from "@/components/form/text-input";
import { signUp } from "@/lib/actions/user.action";
import { getUserTemp } from "@/lib/data/user.data";

export default async function Page({ params }: { params: { id: string } }) {
  const tempUser = await getUserTemp(params.id);
  if (!tempUser) return null;
  const signUpAction = signUp.bind(null, tempUser.email);
  return (
    <SubPage className="max-w-lg" title="Sign Up">
      <form action={signUpAction} className="mt-10">
        <TextInput label="Name" name="name" defaultValue={tempUser.name} />
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

