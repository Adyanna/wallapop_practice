
import { createUser } from "./singupModel.js";

export const singupController = (container) => {

    container.addEventListener('submit', async (e) => {
        e.preventDefault();
        const Loading = new CustomEvent('ShowLoading');
        container.dispatchEvent(Loading);
        const formData = new FormData(container);
        const name = formData.get('name');
        const email = formData.get('email');
        const country = formData.get('country');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const expEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !country || !password || !confirmPassword) {
            const event = new CustomEvent('shownotification', {
                detail: {
                    message: 'Por favor, completa todos los campos.',
                    type_error: 'error'
                }
            });
            container.dispatchEvent(event);
            return;
        }

        if (!expEmail.test(email)) {
            const event = new CustomEvent('shownotification', {
                detail: {
                    message: 'Por favor, introduce un email válido.',
                    type_error: 'error'
                }
            });
            container.dispatchEvent(event);
            return;
        }
        if (password !== confirmPassword) {
            const event = new CustomEvent('shownotification', {
                detail: {
                    message: 'Las contraseñas no coinciden.',
                    type_error: 'error'
                }
            });
            container.dispatchEvent(event);
            return;
        }

        const userData = {
            name: formData.get('name'),
            lastname: formData.get('lastname'),
            username: formData.get('email'),
            country: formData.get('country'),
            password: formData.get('password')
        };

        try {
            const user = await createUser(userData);
            const event = new CustomEvent('shownotification', {
                detail: {
                    message: 'Usuario creado exitosamente.',
                    type_error: 'success'
                }
            });
            container.dispatchEvent(event);
            setTimeout(() => {
                window.location.href = '../login/login.html';
            }, 2000);
        } catch (error) {
            const event = new CustomEvent('shownotification', {
                detail: {
                    message: error,
                    type_error: 'error'
                }
            });
            container.dispatchEvent(event);
        }
        finally {
            const Loading = new CustomEvent('RemoveLoading');
            container.dispatchEvent(Loading);
        }
    });
};