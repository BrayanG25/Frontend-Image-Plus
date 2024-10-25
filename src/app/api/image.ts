const BASE_URL = 'https://image-plus-8621559e1d38.herokuapp.com/api/v1';

import { ImageType } from '../hooks/useFavorites';
import { cache } from 'react';

export const getImagesByKeyWordsFetch = cache(async (data: { search: string }) => {
	const response = await fetch(`${BASE_URL}/image?page=1&perpage=20&search=${data.search}`);

    if (!response.ok) {
        console.log(await response.json());
        
        throw new Error('Error get Images By Keyword')
    };

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