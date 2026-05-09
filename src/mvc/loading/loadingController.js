import { renderLoading } from "./loadingView.js";

export const loadingController = (container) => {

    const createLoading = () => {
        const loadingElement = renderLoading();
        container.appendChild(loadingElement);
        //console.log(loadingElement);
    };

    const removeLoading = () => {
        //  const loadingElement = container.querySelector('.loading-container');
        //  if (loadingElement) {
        //      container.removeChild(loadingElement);
        //  }
        container.innerHTML = '';
    };

    return { createLoading, removeLoading };
};