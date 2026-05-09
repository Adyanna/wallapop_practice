import { loginNavbar,logoutNavbar } from "./headerView.js";
import { getLogUserInfo } from "../singup/singupModel.js";

export const headerController = async (container) => {
    const user = localStorage.getItem('token');
    if (user) {
        const userInfo = await getLogUserInfo(user);
        container.innerHTML = logoutNavbar(userInfo.name);
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

    }else {
        container.innerHTML = loginNavbar();
    }
};