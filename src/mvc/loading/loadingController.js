import { renderLoading } from "./loadingView.js";

export const loadingController = (container) => {

    const createLoading = (type='container') => {
        console.log('TIPO: ',type);
        const loadingElement = renderLoading(type);
        container.appendChild(loadingElement);
    };

    const removeLoading = () => {
        container.innerHTML = '';
    };

    return { createLoading, removeLoading };
};