
import { productController,createProductPageController } from "./src/mvc/products/productsController.js"; 
import { headerController } from "./src/mvc/headers/headerController.js";
import { notificationController } from "./src/mvc/notifications/notificationController.js";
import { loadingController } from "./src/mvc/loading/loadingController.js";

let productsContainer = document.querySelector('.products-container');
let headerContainer = document.querySelector('.navbarNav');
let notificationContainer = document.querySelector('.notification-container');
let loadingContainer = document.querySelector('.load-container');
let newProductContainer = document.querySelector('.new-product');

headerContainer.addEventListener('LoadUserInfo', (e) => {
    notificationShow(e.detail.message, e.detail.type_error);
});
headerController(headerContainer);

const { createLoading, removeLoading } = loadingController(loadingContainer);
productsContainer.addEventListener('ShowLoading',createLoading);
productsContainer.addEventListener('RemoveLoading',removeLoading);

const { notificationShow } = notificationController(notificationContainer);

productsContainer.addEventListener('showNotification', (e) => {
    notificationShow(e.detail.message, e.detail.type_error);
});
newProductContainer.addEventListener('CreateProduct', (e) => {
    notificationShow(e.detail.message, e.detail.type_error); 
});

const { showPage } = createProductPageController(newProductContainer);
headerContainer.addEventListener('CreateProductPage', showPage);

// newProductContainer.addEventListener('CreateProduct', (e) => {
//     notificationShow(e.detail.message, e.detail.type_error);
// });

// notificationController(notificationContainer);
productController(productsContainer);