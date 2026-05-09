// // View: Handles DOM updates and rendering
// const loading = document.getElementById('loading');
// const errorDiv = document.getElementById('error');
// const empty = document.getElementById('empty');
// const productsSection = document.querySelector('.products');
// const createBtn = document.getElementById('createBtn');
// const adDetail = document.getElementById('adDetail');
// const loginBtn = document.getElementById('loginBtn');
// const logoutBtn = document.getElementById('logoutBtn');

// export function showLoading() {
//     loading.style.display = 'block';
//     errorDiv.style.display = 'none';
//     empty.style.display = 'none';
//     productsSection.style.display = 'none';
//     adDetail.style.display = 'none';
// }

// export function showError() {
//     loading.style.display = 'none';
//     errorDiv.style.display = 'block';
//     empty.style.display = 'none';
//     productsSection.style.display = 'none';
//     adDetail.style.display = 'none';
// }

// export function showEmpty() {
//     loading.style.display = 'none';
//     errorDiv.style.display = 'none';
//     empty.style.display = 'block';
//     productsSection.style.display = 'none';
//     adDetail.style.display = 'none';
// }

export function renderProducts(prdc, container) {
    container.innerHTML = '';
    prdc.forEach(prd => {
        const prdDiv = document.createElement('a');
        prdDiv.href = './products/products-detail.html?id=' + prd.id;
        prdDiv.style.textDecoration = 'none';
        prdDiv.style.color = 'inherit';
        let tagsDiv = '<span class="producto-tags">';
        prd.tags.forEach(tag => {
            tagsDiv += `<span class="tag">${tag}</span>`;
        });
        tagsDiv += '</span>';

        prdDiv.innerHTML = `
        <div class="producto-card">
            ${prd.image ? `<img class="producto-img" src="${prd.image}" alt="${prd.name}">` : ''}
            <div class="producto-content">
            <p class="producto-type ${prd.type}">${prd.type === 'sale' ? 'En venta' : 'Compro'}</p>
            <h3>${prd.name}</h3>
            <p class="producto-desc">${prd.description}</p>
            <p class="producto-price">Precio: ${prd.price} USD</p>
            ${tagsDiv}
            </div>
        </div>
        `;
        container.appendChild(prdDiv);
    });
}

export function renderEmpty(container) {
    const prdDiv = document.createElement('div');
    prdDiv.className = 'producto-card-empty';
    prdDiv.innerHTML = `
            <p class="producto-empty">No hay productos disponibles.</p>
        `;
    container.appendChild(prdDiv);
}

export function renderCreateProductForm() {
    return `
     <div class="product-container">
            <div class="product-card">

                <div class="product-header">
                    <h2>Publicar producto</h2>
                    <p>Completa la información del producto</p>
                </div>

                <form>
                    <div class="mb-3">
                        <label class="form-label">Nombre</label>

                        <input type="text" class="form-control custom-input" maxlength="80" name="name" required>
                    </div>

                    <!-- DESCRIPTION -->
                    <div class="mb-3">
                        <label class="form-label">Descripción</label>

                        <textarea class="form-control custom-input textarea" rows="4" maxlength="300"
                            name="description" required></textarea>
                    </div>

                    <!-- PRICE -->
                    <div class="mb-3">
                        <label class="form-label">Precio</label>

                        <input type="number" step="0.01" min="0" class="form-control custom-input" placeholder="0.00"
                            name="price" required>
                    </div>

                    <!-- IMAGE -->
                    <div class="mb-3">
                        <label class="form-label">Imagen (URL)</label>

                        <input type="url" class="form-control custom-input" placeholder="https://..." name="image">
                    </div>

                    <!-- TAGS -->
                    <div class="mb-4">

                        <label class="form-label d-block mb-3">
                            Tags (máximo 3)
                        </label>
                        <div class="tags-grid">

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Electrónicos">
                            Electrónicos
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Electrodomésticos">
                            Electrodomésticos
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Celulares">
                            Celulares
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Computadoras">
                            Computadoras
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Gaming">
                            Gaming
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Audio y Video">
                            Audio y Video
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Hogar">
                            Hogar
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Muebles">
                            Muebles
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Ropa">
                            Ropa
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Calzados">
                            Calzados
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Belleza">
                            Belleza
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Deportes">
                            Deportes
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Vehículos">
                            Vehículos
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Herramientas">
                            Herramientas
                        </label>

                        <label class="tag-item">
                            <input type="checkbox" name="tags" value="Otros">
                            Otros
                        </label>

                    </div>

                    </div>

                    <div class="btn-container mb-4">
                        <button type="submit" class="btn-product">
                            Publicar producto
                        </button>
                    </div>

                </form>

            </div>

        </div>
    `;
}

export function renderProductDetail(product,userbool) {
    return `<div class="product-detail-wrapper">
    <h1 class="page-title">
        Detalle del producto
    </h1>
        <form class="product-detail-form">
            <div class="product-info-section">
                <div class="form-group">
                    <label class="form-label">Nombre</label>
                    <input type="text" class="detail-input title-input" value="${product.name}" disabled>
                </div>
                <div class="form-group">
                    <label class="form-label">Descripción</label>
                    <textarea class="detail-input textarea-input" disabled>${product.description}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Precio</label>
                    <input type="number" class="detail-input price-input" value="${product.price}" disabled>
                </div>
                <div class="form-group">
                    <label class="form-label"> Tipo </label>
                    <input type="text" class="detail-input" value="${product.type}" disabled>
                </div>
                <div class="form-group">
                    <label class="form-label">Tags</label>
                    <input type="text" class="detail-input" value="${product.tags.join(', ')}" disabled>
                </div>
                ${product.image===''? `
                <div class="form-group">
                    <label class="form-label">URL Imagen</label>
                    <input type="url" class="detail-input" value="" disabled>
                </div>
                ` : '' }
                ${userbool ? `
                <div class="buttons-container">
                    <button type="button" class="btn-edit">Editar</button>
                    <button type="submit"class="btn-save" style="display: none;">Guardar</button>
                    <button type="button"class="btn-delete">Eliminar</button>
                </div>` : ''}

            </div>
            ${product.image===''? '' : `
            <div class="product-image-section">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="form-group mt-4">
                    <label class="form-label">URL Imagen</label>
                    <input type="url" class="detail-input" value="${product.image}"disabled>
                </div>
            </div>`}
        </form>
    </div>`;
}
