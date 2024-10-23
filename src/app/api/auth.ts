const BASE_URL = 'http://127.0.0.1:4001/api/v1';

export const singUpFetch = async (data: object) => {
    const response = await fetch(`${BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    return await response.json();    
}

export const logInFetch = async (data: object) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    return await response.json();    
}