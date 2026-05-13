
export function renderLoading(type) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-'+type;
    loadingDiv.innerHTML = `<div class="loader"></div>`;
    return loadingDiv;
}