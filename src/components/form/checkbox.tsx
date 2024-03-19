import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600"
        {...props}
      />
      <label className="ml-2 text-gray-700">{label}</label>
    </div>
  );
};

export default Checkbox;