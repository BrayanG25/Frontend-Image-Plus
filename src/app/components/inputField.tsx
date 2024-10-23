import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  validation?: object;
  error?: { message?: string };
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type = 'text', register, validation = {}, error, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-white">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      {...register(id, validation)}
      className={`block w-full mt-2 px-4 py-2 border border-gray-500 text-sm text-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        error ? 'mb-1 border-red-500' : 'mb-4'
      }`}
    />
    {error && <span className="block text-red-500 text-xs">{error.message}</span>}
  </div>
);

export default InputField;