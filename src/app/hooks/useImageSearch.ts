import { useState } from 'react';
import { getImagesByKeyWordsFetch } from '../api/image';

interface ImageData {
  id: string;
  altDescription: string;
  urls: {
    small: string;
  };
}

export const useImageSearch = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [haveImages, setHaveImages] = useState(false);

  const searchImages = async (searchTerm: string) => {
    const response = await getImagesByKeyWordsFetch({ search: searchTerm });

    if (response?.data?.results) {
      setHaveImages(true);
      setImages(response.data.results);
      
    } else {
      setHaveImages(false);
      setImages([]);
    }
  };

  return { images, haveImages, searchImages };
};