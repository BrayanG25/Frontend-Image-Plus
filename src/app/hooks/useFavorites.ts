import { useState, useEffect, useCallback } from 'react';

export type ImageType = {
    id: string;
    urls: { small: string };
    altDescription?: string;
  };

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<ImageType[]>([]);

    // Load favorites from localStorage when mounting component
    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites) as ImageType[]);
        }
    }, []);

    // Add/Remove Favorites Function
    const toggleFavorite = useCallback((image: ImageType) => {
        setFavorites(prevFavorites => {
        const updatedFavorites = prevFavorites.some(fav => fav.id === image.id)
            ? prevFavorites.filter(fav => fav.id !== image.id)
            : [...prevFavorites, image];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return updatedFavorites;
        });
    }, []);

    // Check if the image is in favorites
    const isFavorite = useCallback((imageId: string) => {
        return favorites.some(fav => fav.id === imageId);
    }, [favorites]);

    return { favorites, toggleFavorite, isFavorite };
};