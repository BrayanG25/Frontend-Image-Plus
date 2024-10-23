import React from 'react';

interface TitleProps {
  text: string;
  size: string;
  align: string;
}

const Title: React.FC<TitleProps> = ({ text, size, align }) => {
  return (
    <h1 className={`font-bold ${size} text-white ${align}`}>{text}</h1>
  );
};

export default Title;