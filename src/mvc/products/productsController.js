import { loadProductsModel, createProductModel, loadProductModel, updateProductModel } from './productsModel.js';
import { renderProducts, renderEmpty, renderCreateProductForm, renderProductDetail, productEnableEdit, productDisabledEdit } from './productsView.js';
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
    const showPage = () => {
        const token = localStorage.getItem('token');
        if (token) {
            container.innerHTML = renderCreateProductForm();
            const formHTML = container.querySelector('form');
            formHTML.addEventListener('submit', (e) => {
                e.preventDefault();
                createProductController(formHTML, container);
            });

        }
    };
    return { showPage };
}

//CREA PRODUCTO
const createProductController = async (container, header) => {
    try {
        const formData = new FormData(container);
        const productData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            type: formData.get('type'),
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
        const successEvent = new CustomEvent('showNotification', {
            detail: {
                message: "Producto cargado con éxito",
                type_error: "success"
            }
        });
        container.dispatchEvent(successEvent);

        if (userbool) {
            const formUpdate = container.querySelector('form');
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
                productDisabledEdit(container, detailprd);
                editButton.style.display = 'inline-block';
                saveButton.style.display = 'none';
                cancelButton.style.display = 'none';
            })
            formUpdate.addEventListener('submit', (e) => {
                e.preventDefault();
                UpdateProductController(productId, formUpdate, container);
            })

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
    }
}

async function UpdateProductController(idPrd, formUpdate, container) {
    try {

        const formData = new FormData(formUpdate);
        const productData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            type: formData.get('type'),
            image: formData.get('image'),
            tags: formData.getAll('tags')
        };

        const updatePrd = await updateProductModel(idPrd, productData);
        const eventSuccess = new CustomEvent('showNotification', {
            detail: {
                message: "El producto se modifico exitosamente.",
                type_error: 'success'
            }
        })
        container.dispatchEvent(eventSuccess);
        window.location.reload();

    } catch (error) {
        const eventFailed = new CustomEvent('showNotification', {
            detail: {
                message: error.message,
                type_error: 'error'
            }
        });
        container.dispatchEvent(eventFailed);
    }
}

