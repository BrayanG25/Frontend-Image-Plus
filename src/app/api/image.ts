const BASE_URL = 'http://127.0.0.1:4001/api/v1';

import { ImageType } from '../hooks/useFavorites';
import { cache } from 'react';

export const getImagesByKeyWordsFetch = cache(async (data: { search: string }) => {
	const response = await fetch(`${BASE_URL}/image?page=1&perpage=10&search=${data.search}`);

    if (!response.ok) throw new Error('Error al obtener las imágenes');

    return await response.json();
});

export const unlikeImage = async (accessToken: string | null, image: ImageType) => {
    const data = { accessToken: accessToken, image: image };
    
    const response = await fetch(`${BASE_URL}/image/unlike`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    return await response.json();   
}

export const likeImage = async (accessToken: string | null, image: ImageType) => {
    const data = { accessToken: accessToken, image: image };

    const response = await fetch(`${BASE_URL}/image/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    return await response.json();
}

export const getImagesFavorites = async (accessToken: string) => {
    const response = await fetch(`${BASE_URL}/image/user/favorites?accessToken=${accessToken}`);
    
    return await response.json();
}

export const likeImages = async (accessToken: string | null, images: Array<ImageType> ) => {
    const data = { accessToken: accessToken, images: images };

    const response = await fetch(`${BASE_URL}/image/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data),
    });
    
    return await response.json();
}