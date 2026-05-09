
export async function loginModel(username,password) {
    const url = 'http://localhost:8000/auth/login';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (!response.ok) {
        console.log(response);
        throw new Error('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
    return data.accessToken;
}