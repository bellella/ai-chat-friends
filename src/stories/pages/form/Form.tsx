import RadioGroup from '../../../components/form/radio-group';
import TextInput from '../../../components/form/text-input';
import Textarea from '../../../components/form/textarea';
import React from 'react';

export const FormPage: React.FC = () => {
  return (
    <form className="max-w-lg mx-auto">
      <div className="space-y-12">
        <div className="border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <div className="mt-10">
            <TextInput label="Name" name="name" />
            <Textarea label="Description" name="description" rows={3} />
            <RadioGroup
              name="gender"
              options={[
                { label: 'Femail', value: 'F' },
                { label: 'Male', value: 'M' },
                { label: 'Other', value: 'O' },
              ]} selectedOption="F" />
          </div>
          <button className="button-base">Sign up!</button>
        </div>
      </div>
    </form>
  );
};
