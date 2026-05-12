import { headerController } from "../src/mvc/headers/headerController.js";
import { notificationController } from "../src/mvc/notifications/notificationController.js";
import { loadingController } from "../src/mvc/loading/loadingController.js";
import {productDetailController} from "../src/mvc/products/productsController.js";

let headerContainer = document.querySelector('.navbarNav');
let notificationContainer = document.querySelector('.notification-container');
let productDetailContainer = document.querySelector('.productDetail-container');
let spinnerContainer = document.querySelector('.spinner-container');
//ARMAMOS EL HEADER
headerController(headerContainer,'detail');

//ANIADIMOS EL EVENTRO DEL SPINNER DE CARGA
const { createLoading, removeLoading } = loadingController(spinnerContainer);
productDetailContainer.addEventListener('ShowLoading',createLoading);
productDetailContainer.addEventListener('RemoveLoading',removeLoading);

//ANIADIMOS EL EVENTO DE NOTIFICACION DE ERROR/EXITO
const { notificationShow } = notificationController(notificationContainer);
productDetailContainer.addEventListener('showNotification', (e) => {
    notificationShow(e.detail.message, e.detail.type_error);
});

productDetailController(productDetailContainer);



