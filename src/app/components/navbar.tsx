'use client'

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-zinc-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link href="/">Image Plus</Link>
        </div>
        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        {/* Menu links for desktop */}
        <div className="hidden md:flex space-x-4 items-center">
            <Link href="/">
              <p className="text-white hover:text-gray-300">Home</p>
            </Link>
            <Link href="/images/favorites">
              <p className="text-white hover:text-gray-300">Favorite Images</p>
            </Link>
            <Link href="/auth/signup">
              <button className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md transition-colors duration-300">
                Sign Up
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/">
              <p className="block text-white hover:text-gray-300">Home</p>
            </Link>
            <Link href="/images/favorites">
              <p className="block text-white hover:text-gray-300 mt-3">Favorite Images</p>
            </Link>
            <Link href="/auth/signup">
              <button className="w-full text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md transition-colors duration-300 mt-3">
                Sign Up
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="w-full text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-300 mt-3">
                Login
              </button>
            </Link>
          </div>
        )}
    </nav>
  );
}
