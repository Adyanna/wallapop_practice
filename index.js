
import { productController,createProductPageController } from "./src/mvc/products/productsController.js"; 
import { headerController,filterHeaderController } from "./src/mvc/headers/headerController.js";
import { notificationController } from "./src/mvc/notifications/notificationController.js";
import { loadingController } from "./src/mvc/loading/loadingController.js";

let productsContainer = document.querySelector('.products-container');
let headerContainer = document.querySelector('.navbarNav');
let filterHeaderContainer = document.querySelector('.filter-container');
let notificationContainer = document.querySelector('.notification-container');
let loadingContainer = document.querySelector('.load-container');
let newProductContainer = document.querySelector('.new-product');

headerContainer.addEventListener('LoadUserInfo', (e) => {
    notificationShow(e.detail.message, e.detail.type_error);
});

headerController(headerContainer,'index');
filterHeaderController(filterHeaderContainer);

const { createLoading, removeLoading } = loadingController(loadingContainer);
productsContainer.addEventListener('ShowLoading',(e)=>{createLoading()});
productsContainer.addEventListener('RemoveLoading',removeLoading);
newProductContainer.addEventListener('ShowLoading',(e)=>{createLoading('overlay')});
newProductContainer.addEventListener('RemoveLoading',removeLoading);


const { notificationShow } = notificationController(notificationContainer);

productsContainer.addEventListener('showNotification', (e) => {
    notificationShow(e.detail.message, e.detail.type_error);
});
newProductContainer.addEventListener('CreateProduct', (e) => {
    notificationShow(e.detail.message, e.detail.type_error); 
});
newProductContainer

const { showPage } = createProductPageController(newProductContainer);
headerContainer.addEventListener('CreateProductPage', showPage);

productController(productsContainer);