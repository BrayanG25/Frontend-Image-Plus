'use client'

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useImageSearch } from './hooks/useImageSearch';
import { useFavorites, ImageType } from './hooks/useFavorites';

import Navbar from './components/navbar';
import ButtonSubmit from './components/buttonSubmit';
import Title from './components/title';
import InputField from './components/inputField';

export default function Home() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { images, haveImages, searchImages } = useImageSearch();
  const { toggleFavorite, isFavorite } = useFavorites();

  const onSubmit = handleSubmit((data) => {
    if (data?.query?.trim() === '') {
      reset();
      return
    };
    searchImages(data.query.trim());
  });
  
  return (
    <>
      <Navbar />
      <div className={`flex items-center justify-center ${haveImages ? 'pt-8' : 'min-h-[calc(100vh-15vh)]'}`}>
        <div className="block w-full max-w-md md:max-w-4xl px-4">
          <header className="w-full py-5 px-10 rounded-md bg-zinc-800 shadow-lg mb-4">
            <Title text="Image Plus" align="text-center" size="text-6xl" />
            <form onSubmit={onSubmit}>
              <div className="mt-4 flex flex-col md:flex-row md:items-center md:gap-4">
                <div className='w-full md:w-2/3'>
                  <InputField
                    id="query"
                    label="Enter keyword to search images"
                    type="text"
                    placeholder="Foods, Shoes, Clothes ..."
                    register={register}
                    validation={{ required: { value: true, message: 'Field is required' } }}
                    error={errors.query}
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <ButtonSubmit
                    label='Search'
                    paddingX='px-6'
                    paddingY='py-2'
                    size='text-md'
                    marginTop='mt-0'
                    marginButtom='mb-0'
                  />
                </div>
              </div>
            </form>
          </header>
        </div>
      </div>
      <main>
        {haveImages ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
            {images.map((image: ImageType) => (
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
                      onClick={() => toggleFavorite(image)}
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
          <span className="read-only"></span>
        )}
      </main>
    </>
  );
}