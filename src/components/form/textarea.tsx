import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label className="label-base" htmlFor={props.id}>
        {label}
      </label>
      <textarea
        className="input-base block w-full h-40 px-4 py-2 leading-tight rounded-lg"
        {...props}
      />
    </div>
  );
};

export default Textarea;