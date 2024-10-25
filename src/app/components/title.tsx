import React from 'react';

interface TitleProps {
  text: string;
  size: string;
  align: string;
  color: string;
};

const Title: React.FC<TitleProps> = ({ text, size, align, color }) => {
  return (
    <h1 className={`font-bold ${size} ${color} ${align}`}>{text}</h1>
  );
};

export default Title;