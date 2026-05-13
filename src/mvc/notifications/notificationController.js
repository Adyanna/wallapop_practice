
import {notificationView} from './notificationView.js';

export const notificationController = (container) => {

    const notificationShow = (message, type_error) => {
        console.log(message,' - ',type_error)
        const newNot = document.createElement('div');
        newNot.innerHTML = notificationView(message, type_error);
        console.log(newNot);
        container.appendChild(newNot);
        setTimeout(() => {
             newNot.remove();
          }, 3000);
    }
    return { notificationShow };
};