
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
        if (!response.ok) {
            throw new Error('No se encuentran productos que mostrar');
        }
        const data = await response.json();
        return data;

    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('No se puede conectar con el servidor, por favor intenta de nuevo más tarde');
        }
    }
}


export async function createProductModel(newPrd) {
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
        console.log(response);
        if (!response.ok) {
            console.log(response);
            throw new Error('El producto indicado no existe o no se puede cargar, por favor intenta de nuevo más tarde');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error al cargar el producto, por favor intenta de nuevo más tarde');
    }
}

export async function updateProductModel(idprd, dataprd) {
    const url = `http://localhost:8000/api/products/${idprd}`;
    console.log(idprd,dataprd);
    try {
        const token = localStorage.getItem('token');
        if(!token){
            throw new Error("Por favor, vuelva a iniciar session");
        }
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify({name: dataprd.name,
            description: dataprd.description,
            price: dataprd.price,
            type: dataprd.type,
            image: dataprd.image,
            tags: dataprd.tags})
        });
        console.log(response)
        if (!response.ok) {
            throw new Error("Error al editar los datos"); 
        }
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        throw new Error("Error al editar los datos");
        
    }
}
