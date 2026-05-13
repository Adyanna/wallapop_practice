import { loginController } from "../src/mvc/login/loginController.js";
import { notificationController } from "../src/mvc/notifications/notificationController.js";
import { loadingController } from "../src/mvc/loading/loadingController.js";

let notificationContainer = document.querySelector('.notification-container');
let formLogin = document.querySelector('form');
let loadingContainer = document.querySelector('.load-container');

const { notificationShow } = notificationController(notificationContainer);
formLogin.addEventListener('shownotification', (e) => {
    notificationShow(e.detail.message, e.detail.type_error);
});

const {createLoading, removeLoading} = loadingController(loadingContainer);
formLogin.addEventListener('ShowLoading',(e)=>{createLoading('overlay');});
formLogin.addEventListener('RemoveLoading',removeLoading)


loginController(formLogin);
