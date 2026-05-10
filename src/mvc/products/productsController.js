import { loadProductsModel, createProductModel, loadProductModel } from './productsModel.js';
import { renderProducts, renderEmpty, renderCreateProductForm, renderProductDetail,productEnableEdit,productDisabledEdit } from './productsView.js';
import { getLogUserInfo } from "../singup/singupModel.js";
//MUESTRA TODO
export const productController = async (container) => {

    try {
        const loadingEvent = new CustomEvent('ShowLoading');
        container.dispatchEvent(loadingEvent);
        const products = await loadProductsModel();
        if (products.length > 0) {
            renderProducts(products, container);
        } else {
            renderEmpty(container);
            throw new Error("No se encuentran productos que mostrar");
        }
    } catch (error) {
        const failedEvent = new CustomEvent('showNotification', {
            detail: {
                message: error.message,
                type_error: "error"
            }
        });
        container.dispatchEvent(failedEvent);
    }
    finally {
        const removeEvent = new CustomEvent('RemoveLoading');
        container.dispatchEvent(removeEvent);
    };
};

//MUESTRA FORMULARIO PARA CREACION DE PRODUCTO
export const createProductPageController = (container) => {
    console.log('createProductPageController');
    const showPage = () => {
        const token = localStorage.getItem('token');
        console.log('Token en createProductPageController:', token);
        if (token) {
            container.innerHTML = renderCreateProductForm();
            const formHTML = container.querySelector('form');
            console.log('Formulario encontrado:', formHTML);
            formHTML.addEventListener('submit', async (e) => {
                e.preventDefault();
                createProductController(formHTML, container);
            });

        }
    };
    return { showPage };
}

//CREA PRODUCTO
const createProductController = async (container, header) => {
    console.log('Formulario enviado');
    try {
        const formData = new FormData(container);
        const productData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            image: formData.get('image'),
            tags: formData.getAll('tags')
        };
        const newProduct = await createProductModel(productData);
        const event = new CustomEvent('CreateProduct', {
            detail: {
                message: "Producto creado con éxito",
                type_error: "success"
            }
        });
        header.dispatchEvent(event);
        setTimeout(() => {
            window.location = '/';
            //container.innerHTML = '';
        }, 2000);
    } catch (error) {
        const failedEvent = new CustomEvent('CreateProduct', {
            detail: {
                message: error.message,
                type_error: "error"
            }
        });
        header.dispatchEvent(failedEvent);
    }
}

//MUESTRA DETALLE DE PRODUCTO
export const productDetailController = async (container) => {

    const productId = new URLSearchParams(window.location.search).get('id');
    if (!productId) {
        const failedEvent = new CustomEvent('showNotification', {
            detail: {
                message: "ID de producto no válido",
                type_error: "error"
            }
        });
        container.dispatchEvent(failedEvent);
        setTimeout(() => {
            window.location = '/';
        }, 2000);;
    }
    try {
        const loadingEvent = new CustomEvent('ShowLoading');
        container.dispatchEvent(loadingEvent);
        const userToken = localStorage.getItem('token');
        let userbool = false;
        const detailprd = await loadProductModel(productId);

        if (userToken) {
            const userInfo = await getLogUserInfo(userToken);
            if (userInfo.id === detailprd.userId) {
                userbool = true;
            }
        }
        container.innerHTML = renderProductDetail(detailprd, userbool);

        const editButton = container.querySelector('.btn-edit');
        const saveButton = container.querySelector('.btn-save');
        const cancelButton = container.querySelector('.btn-cancel');
        editButton.addEventListener('click', () => {
            productEnableEdit(container);
            editButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
            cancelButton.style.display = 'inline-block';
        });

        cancelButton.addEventListener('click', () => {
            productDisabledEdit(container,detailprd);
            editButton.style.display = 'inline-block';
            saveButton.style.display = 'none';
            cancelButton.style.display = 'none';
        })

        const successEvent = new CustomEvent('showNotification', {
            detail: {
                message: "Producto cargado con éxito",
                type_error: "success"
            }
        });
        container.dispatchEvent(successEvent);
    } catch (error) {
        const failedEvent = new CustomEvent('showNotification', {
            detail: {
                message: error.message,
                type_error: "error"
            }
        });
        container.dispatchEvent(failedEvent);
    }
    finally {
        const removeEvent = new CustomEvent('RemoveLoading');
        container.dispatchEvent(removeEvent);
    }
}

