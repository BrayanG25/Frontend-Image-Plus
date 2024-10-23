'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useFavorites, ImageType } from '../../hooks/useFavorites';

import Navbar from '../../components/navbar';
import Title from '../../components/title';

export default function Favorites() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [favorites, setFavorites] = useState<ImageType[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites) as ImageType[]);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-4">
        <Title text="Your Favorite Images" align="text-center" size="text-4xl"/>
        {favorites.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
            {favorites.map((image: ImageType) => (
              <li key={image.id} className="relative flex justify-center">
                <div className='h-[400px] w-full'>
                  <Image 
                    src={image.urls.small}
                    alt={image.altDescription ?? 'Image'}
                    width={200} 
                    height={200}
                    className="w-full h-5/6 rounded-lg transition-transform duration-300 transform hover:scale-105 shadow-lg"
                  />
                  <div className='flex items-center justify-center mt-2'>
                    <button
                      onClick={() => {
                        toggleFavorite(image);
                        setFavorites(favorites.filter(fav => fav.id !== image.id));
                      }}
                      className={`text-2xl top-2 left-2 text-red-500 transition-transform duration-300 ${
                        isFavorite(image.id) ? 'scale-110' : 'scale-100'
                      }`}
                    >
                      {isFavorite(image.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-xl">No favorites yet. Go and add some!</p>
        )}
      </main>
    </>
  );
}