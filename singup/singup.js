import { singupController } from "../src/mvc/singup/singupController.js";
import { headerController } from "../src/mvc/headers/headerController.js";
import { notificationController } from "../src/mvc/notifications/notificationController.js";
import { loadingController } from "../src/mvc/loading/loadingController.js";

let formSingup = document.querySelector('form');
let headerContainer = document.querySelector('.navbarNav');
let notificationContainer = document.querySelector('.notification-container');
let loadingContainer = document.querySelector('.load-container');
//loadingContainer.removeAttribute('style');
//loadingContainer.computedStyleMap.cssText=``;

headerController(headerContainer,'singup');
const { createLoading, removeLoading } = loadingController(loadingContainer);
formSingup.addEventListener('ShowLoading',(e)=>{createLoading('overlay');});
formSingup.addEventListener('RemoveLoading',removeLoading);

const { notificationShow } = notificationController(notificationContainer);
formSingup.addEventListener('shownotification', (e) => {
     notificationShow(e.detail.message, e.detail.type_error);
});

singupController(formSingup);

