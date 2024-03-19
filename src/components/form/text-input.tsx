import React, { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label className="label-base" htmlFor={props.id}>
        {label}
      </label>
      <input
        className="input-base form-input block w-full px-4 py-2 leading-tight"
        {...props}
      />
    </div>
  );
};

export default TextInput;