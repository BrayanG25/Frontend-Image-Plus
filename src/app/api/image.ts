const BASE_URL = 'http://127.0.0.1:4001/api/v1';

export const getImagesByKeyWordsFetch = async (data: { search: string }) => {
    const response = await fetch(`${BASE_URL}/image?page=1&perpage=10&search=${data.search}`);
    return await response.json();    
}