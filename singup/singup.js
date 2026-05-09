import { singupController } from "../src/mvc/singup/singupController.js";
import { headerController } from "../src/mvc/headers/headerController.js";
import { notificationController } from "../src/mvc/notifications/notificationController.js";
//import { loadingController } from "./src/mvc/loading/loadingController.js";

let formSingup = document.querySelector('form');
let headerContainer = document.querySelector('.navbarNav');
let notificationContainer = document.querySelector('.notification-container');

headerController(headerContainer);
//const { createLoading, removeLoading } = loadingController(notificationContainer);
//productsContainer.addEventListener('ShowLoading',createLoading);
//productsContainer.addEventListener('RemoveLoading',removeLoading);

const { notificationShow } = notificationController(notificationContainer);
formSingup.addEventListener('shownotification', (e) => {
     notificationShow(e.detail.message, e.detail.type_error);
});

singupController(formSingup);

