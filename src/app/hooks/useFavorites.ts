import { useState, useEffect, useCallback } from 'react';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store/store';

import { likeImage, unlikeImage } from '../api/image'; 

export type ImageType = {
    id: string;
    urls: { small: string };
    altDescription?: string;
};

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<ImageType[]>([]);
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    // Load favorites from localStorage when mounting component
    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites) as ImageType[]);
        }
    }, []);

    // Add/Remove Favorites Function
    const toggleFavorite = useCallback(async (image: ImageType) => {
        setFavorites(prevFavorites => {
        const updatedFavorites = prevFavorites.some(fav => fav.id === image.id)
            ? prevFavorites.filter(fav => fav.id !== image.id)
            : [...prevFavorites, image];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return updatedFavorites;
        });

        try {
            if (accessToken) {
                if (favorites.some(fav => fav.id === image.id)) {
                    await unlikeImage(accessToken, image);
                } else {
                    await likeImage(accessToken, image);
                }
            }
        } catch (error) {
            console.error("Error update favorites:", error);
        }
    }, [accessToken, favorites]);

    // Check if the image is in favorites
    const isFavorite = useCallback((imageId: string) => {
        return favorites.some(fav => fav.id === imageId);
    }, [favorites]);

    return { favorites, toggleFavorite, isFavorite };
};