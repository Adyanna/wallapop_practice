import { loginController } from "../src/mvc/login/loginController.js";
import { notificationController } from "../src/mvc/notifications/notificationController.js";

let notificationContainer = document.querySelector('.notification-container');
let formLogin = document.querySelector('form');

const { notificationShow } = notificationController(notificationContainer);

formLogin.addEventListener('shownotification', (e) => {
    notificationShow(e.detail.message, e.detail.type_error);
});

loginController(formLogin);
