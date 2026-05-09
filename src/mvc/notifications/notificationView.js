

export const notificationView = (message, type) => {
    return `<div class="toast-notification toast-${type}">
        <div class="toast-icon">
            ${type === 'success' ? '✓' : '⚠'}
        </div>
        <div class="toast-content">
            <h4 class="toast-title">
                ${type === 'success' ? 'Éxito' : 'Error'}
            </h4>
            <p class="toast-message">
                ${message}
            </p>
        </div>
    </div>`;
}