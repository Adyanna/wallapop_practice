
export function renderLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-container';
    loadingDiv.innerHTML = `<div class="loader"></div>`;
    return loadingDiv;
}