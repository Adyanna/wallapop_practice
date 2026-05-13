import { loginModel } from './loginModel.js';

export const loginController = (container) => {

    container.addEventListener('submit', async (e) => {
        e.preventDefault();
        const Loading = new CustomEvent('ShowLoading');
        container.dispatchEvent(Loading);
        const formData = new FormData(container);
        const user = formData.get('user');
        const password = formData.get('password');
        try {
            const data = await loginModel(user, password);
            localStorage.setItem('token', data);
            const event = new CustomEvent('shownotification', {
                detail: {
                    message: 'Inicio de sesión exitoso.',
                    type_error: 'success'
                }
            });
            container.dispatchEvent(event);
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        } catch (error) {
            const event = new CustomEvent('shownotification', {
                detail: {
                    message: error.message,
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