
export async function createUser(userData) {
    console.log('Creating user with data:', userData);
    try {
        const url = 'http://localhost:8000/auth/register';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Error al crear el usuario: ' + data.message);
        }
        return data;

    } catch (error) {
        console.error('Error creating user:', error);
        throw error.message;
    }
}


export const getLogUserInfo = async () => {
    const url = 'http://localhost:8000/auth/me';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
        });
        const user = await response.json();
        return user;
    } catch (error) {
        throw new Error('Error al obtener la información del usuario: ' + error.message);
    }
};

// funtion para ver el usuario si existe