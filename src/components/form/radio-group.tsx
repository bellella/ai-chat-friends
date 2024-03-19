import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: Option[];
  selectedOption: string;
  onChange?: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, selectedOption }) => {
  return (
    <div className="flex gap-5">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="radio"
            name={name}
            id={option.value}
            className="form-radio h-5 w-5 text-blue-600"
            value={option.value}
            defaultChecked={selectedOption === option.value}
          />
          <label htmlFor={option.value} className="ml-2 text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;