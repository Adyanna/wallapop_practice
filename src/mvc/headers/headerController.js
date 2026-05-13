import { loginNavbar, logoutNavbar, filterHeader } from "./headerView.js";
import { getLogUserInfo } from "../singup/singupModel.js";

export const headerController = async (container, type) => {
    const user = localStorage.getItem('token');
    if (user) {
        try {
            const userInfo = await getLogUserInfo(user);
            container.innerHTML = logoutNavbar(userInfo.name, type);
            const logoutButton = container.querySelector('.btnlogout');
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('token');
                container.innerHTML = loginNavbar();
            });
            const createProductLink = container.querySelector('.new-product');
            createProductLink.addEventListener('click', () => {
                const event = new CustomEvent('CreateProductPage');
                container.dispatchEvent(event);
                
            });
        } catch (error) {
            const failedEvent = new CustomEvent('LoadUserInfo', {
                detail: {
                    message: error,
                    type_error: "error"
                }
            });
            container.dispatchEvent(failedEvent);
        }
    } else {
        container.innerHTML = loginNavbar(type);
    }
};

export const filterHeaderController = (container) => {

    const name = new URLSearchParams(window.location.search).get('name') || "";
    const price_gte = new URLSearchParams(window.location.search).get('price_gte') || "";
    const price_lte = new URLSearchParams(window.location.search).get('price_lte') || "";
    const type = new URLSearchParams(window.location.search).get('type') || "";
    const tag = new URLSearchParams(window.location.search).get('tag') || "";
    container.innerHTML = filterHeader(name, price_gte, price_lte, type, tag);
    console.log('name: ', name, ' precio: ', price_gte, price_lte, ' tipo: ', type, ' tag: ', tag);
    const formHTML = container.querySelector('.filters-form');
    console.log("ENTRA AL HEADER");
    formHTML.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(formHTML);
        const name = formData.get('name');
        const price_gte = formData.get('priceMin');
        const price_lte = parseFloat(formData.get('priceMax'));
        const type = formData.get('type');
        const tag = formData.get('tags');
        const url = new URL(window.location);
        //console.log('DESDE EL FORMULARIO name: ', name, ' precio: ', price_gte, price_lte, ' tipo: ', type, ' tag: ', tag);

        if (name) {
            url.searchParams.set('name', name)
        } else {
            url.searchParams.delete('name');
        };
        if (price_gte) {
            url.searchParams.set('price_gte', price_gte)
        } else {
            url.searchParams.delete('price_gte');
        };
        if (price_lte) {
            url.searchParams.set('price_lte', price_lte)
        } else {
            url.searchParams.delete('price_lte');
        };
        if (type) {
            url.searchParams.set('type', type)
        } else {
            url.searchParams.delete('type');
        };
        if (tag) {
            url.searchParams.set('tag', tag)
        } else {
            url.searchParams.delete('tag');
        };
        window.location.href = url;
    });
}