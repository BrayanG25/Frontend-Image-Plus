const BASE_URL = 'https://image-plus-8621559e1d38.herokuapp.com/api/v1';

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