export function renderProducts(prdc, container) {

    // console.log('llega hasta aqui cxxxx');
    //  console.log(prdc);
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

export function renderProductDetail(product, userbool) {
    return `<div class="product-detail-wrapper ${!product.image?'no-image':''}">
    <h1 class="page-title">
        Detalle del producto
    </h1>
        <form class="product-detail-form ${!product.image?'no-image':''}">
            <div class="product-info-section">
                <div class="form-group">
                    <label class="form-label">Nombre</label>
                    <input type="text" class="detail-input title-input name" name="name" value="${product.name}" disabled>
                </div>
                <div class="form-group">
                    <label class="form-label">Descripción</label>
                    <textarea class="detail-input textarea-input description" name="description" disabled>${product.description}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Precio</label>
                    <input type="number" class="detail-input price-input price" name="price" value="${product.price}" disabled>
                </div>
                <div class="form-group">
                    <label class="form-label">Tipo</label>

                    <select class="detail-input type-input type"  name="type" disabled>
                        <option value="sale" ${product.type === 'sale' ? 'selected' : ''}>
                            Venta
                        </option>

                        <option value="purchase" ${product.type === 'purchase' ? 'selected' : ''}>
                            Compra
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label d-block mb-3">Tags</label>
                    <div class="contenedor-tags">
                        <label class="tag-item"><input type="checkbox" name="tags" value="Tecnología" ${product.tags.includes('Tecnología') ? 'checked' : ''} disabled>Tecnología</label>
                        <label class="tag-item"><input type="checkbox" name="tags" value="Hogar" ${product.tags.includes('Hogar') ? 'checked' : ''} disabled>Hogar</label>
                        <label class="tag-item"><input type="checkbox" name="tags" value="Moda" ${product.tags.includes('Moda') ? 'checked' : ''} disabled>Moda</label>
                        <label class="tag-item"><input type="checkbox" name="tags" value="Belleza" ${product.tags.includes('Belleza') ? 'checked' : ''} disabled>Belleza</label>
                        <label class="tag-item"><input type="checkbox" name="tags" value="Deportes" ${product.tags.includes('Deportes') ? 'checked' : ''} disabled>Deportes</label>
                        <label class="tag-item"><input type="checkbox" name="tags" value="Vehículos" ${product.tags.includes('Vehículos') ? 'checked' : ''} disabled>Vehículos</label>
                        <label class="tag-item"><input type="checkbox" name="tags" value="Herramientas" ${product.tags.includes('Herramientas') ? 'checked' : ''} disabled>Herramientas</label>
                        <label class="tag-item"><input type="checkbox" name="tags" value="Entretenimiento" ${product.tags.includes('Entretenimiento') ? 'checked' : ''} disabled>Entretenimiento</label>
                        <label class="tag-item"><input type="checkbox" name="tags" value="Otros" ${product.tags.includes('Otros') ? 'checked' : ''} disabled>Otros</label>
                    </div>
                </div>
                ${product.image === '' ? `
                <div class="form-group">
                    <label class="form-label">URL Imagen</label>
                    <input type="url" class="detail-input image" value="" name="image" disabled>
                </div>
                ` : ''}
                ${userbool ? `
                <div class="buttons-container">
                    <button type="button" class="btn-edit" style="display: inline-block;">Editar</button>
                    <button type="submit" class="btn-save" style="display: none;">Guardar</button>
                    <button type="button" class="btn-cancel" style="display: none;">Cancelar</button>
                </div>` : ''}

            </div>
            ${product.image === '' ? '' : `
            <div class="product-image-section">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="form-group mt-4">
                    <label class="form-label">URL Imagen</label>
                    <input type="url" class="detail-input image" name="image" value="${product.image}"disabled>
                </div>
            </div>`}
        </form>
    </div>`;
}


export function productEnableEdit(container) {
    const nameElement = container.querySelector('.name');
    nameElement.removeAttribute('disabled');
    const descriptionElement = container.querySelector('.description');
    descriptionElement.removeAttribute('disabled');
    const priceElement = container.querySelector('.price');
    priceElement.removeAttribute('disabled');
    const typeElement = container.querySelector('.type');
    typeElement.removeAttribute('disabled');
    const tagsContainer = container.querySelectorAll('input[name="tags"]');
    tagsContainer.forEach(input => {
        input.disabled = false;
    });
    const imageElement = container.querySelector('.image');
    imageElement.removeAttribute('disabled');
}

export function productDisabledEdit(container,detailprd) {
    console.log('desHabilitando edición de producto');
    const nameElement = container.querySelector('.name');
    nameElement.value=detailprd.name
    nameElement.setAttribute('disabled','disabled');
    const descriptionElement = container.querySelector('.description');
    descriptionElement.setAttribute('disabled','disabled');
    descriptionElement.value = detailprd.description
    const priceElement = container.querySelector('.price');
    priceElement.setAttribute('disabled','disabled');
    priceElement.value = detailprd.price;
    const typeElement = container.querySelector('.type');
    typeElement.setAttribute('disabled','disabled');
    typeElement.value = detailprd.type

    const tagsContainer = container.querySelectorAll('input[name="tags"]');
    tagsContainer.forEach(input => {
        input.disabled = true;
        input.checked = detailprd.tags.includes(input.value);

    });
    const imageElement = container.querySelector('.image');
    imageElement.setAttribute('disabled','disabled');
    imageElement.value = detailprd.image
}