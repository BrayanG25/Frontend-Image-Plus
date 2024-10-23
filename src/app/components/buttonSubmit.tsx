import React from 'react';

interface ButtonProps {
  label: string;
  paddingX: string;
  paddingY: string;
  size: string;
  marginTop: string;
  marginButtom: string;
}

const ButtonSubmit: React.FC<ButtonProps> = ({ label, paddingX, paddingY, size, marginTop, marginButtom }) => {
  return (
    <button 
      type='submit'
      className={`block w-full ${marginTop} ${marginButtom} ${paddingX} ${paddingY} ${size} border border-blue-500 bg-blue-500 text-white font-bold shadow-sm rounded-lg transition duration-300 transform hover:bg-blue-600`}
    >
      {label}
    </button>
  );
};

export default ButtonSubmit;