
export const loadProductsModel = async () => {
    const limit = 10;
    const page = 1;
    const URL = `http://localhost:8000/api/products?_page=${page}&_limit=${limit}`;
    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.status);
        if (!response.ok) {
            throw new Error('Error al cargar productos, por favor intenta de nuevo más tarde');
        }
        const data = await response.json();
        return data;

    } catch (error) {
        if(error.message==='Failed to fetch') {
            throw new Error('No se puede conectar con el servidor, por favor intenta de nuevo más tarde');
        }
    }
}




export async function createProductModel(newPrd) {
    console.log('LISTA DE PRODUCTOS', newPrd);
    const url = 'http://localhost:8000/api/products';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newPrd)
        });
        if (!response.ok) {
            throw new Error('Error al crear el producto, por favor intenta de nuevo más tarde');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error al crear el producto, por favor intenta de nuevo más tarde');
    }
}

export async function loadProductModel(productId) {
    const URL = `http://localhost:8000/api/products/${productId}`;

    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            }
        });
        if (!response.ok) {
            throw new Error('Error al cargar el producto, por favor intenta de nuevo más tarde');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error al cargar el producto, por favor intenta de nuevo más tarde');
    }
}
