import Link from 'next/link';
import React from 'react';

interface RedirectProps {
  text: string;
  description: string;
  href: string;
}

const Redirect: React.FC<RedirectProps> = ({text, description, href}) => {
  return (
    <p className='flex gap-x-2 justify-between'>
      {description} <Link href={href} className='text-blue-500'>{text}</Link>
    </p>
  );
};

export default Redirect;