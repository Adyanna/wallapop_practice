
export const logoutNavbar = (u,type) => {
    return `<ul class="navbar-nav me-auto">
                  ${type!=='detail'?`  <li class="nav-item">
                        <button class="nav-link btn btn-link new-product">Crear producto</button>
                    </li>`:''}
            </ul>
            <ul class="navbar-nav">
                    <li class="nav-item">
                        <span class="nav-link text-dark">Hola, ${u}</span>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link btn btn-link btnlogout">Logout</button>
                    </li>
                </ul>`;
};

//SINGIP NO CREAR NAVBAR

export const loginNavbar = (type) => {
     return `<ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="../login/login.html">Login</a>
                    </li>
                    ${type!=='singup'? `
                    <li class="nav-item">
                        <a class="nav-link" href="./singup/singup.html">Signup</a>
                    </li>`:''}
                </ul>`;
}

export const filterHeader =(name,price_gte,price_lte,type,tag)=>{
    return `<div>
                <form class="filters-form">
                    <!-- NAME -->
                    <div class="filter-group">
                        <label class="filter-label">Producto</label>
                        <input type="text" class="filter-input filter-name " name="name" value ="${name? name:''}" placeholder="Buscar producto...">
                    </div>

                    <!-- PRECIO MIN -->
                    <div class="filter-group">
                        <label class="filter-label">Precio mínimo</label>
                        <input type="number" class="filter-input filter-min-price" name="priceMin" value="${price_gte? price_gte:''}" placeholder="0">
                    </div>

                    <!-- PRECIO MAX -->
                    <div class="filter-group">
                        <label class="filter-label">Precio máximo</label>
                        <input type="number" class="filter-input filter-max-price"  name="priceMax" value="${price_lte? price_lte:''}" placeholder="1000">
                    </div>
                    <!-- TYPE -->
                    <div class="filter-group">
                        <label class="filter-label">Tipo</label>
                        <select class="filter-select filter-type" name="type">
                            <option value="">Todos</option>
                            <option value="sale" ${type=='sale'? 'selected':''}>Venta</option>
                            <option value="purchase" ${type=='purchase'? 'selected':''}>Compra</option>
                        </select>
                    </div>
                    <!-- TAG -->
                    <div class="filter-group">
                        <label class="filter-label">Categoría</label>
                        <select class="filter-select filter-tag" name="tags">
                            <option value="">Todas</option>
                            <option value="Tecnología" ${tag=='Tecnología'? 'selected':''}>Tecnología</option>
                            <option value="Hogar" ${tag=='Hogar'? 'selected':''}>Hogar</option>
                            <option value="Moda" ${tag=='Moda'? 'selected':''}>Moda</option>
                            <option value="Belleza" ${tag=='Belleza'? 'selected':''}>Belleza</option>
                            <option value="Deportes" ${tag=='Deportes'? 'selected':''}>Deportes</option>
                            <option value="Vehículos" ${tag=='Vehículos'? 'selected':''}>Vehículos</option>
                            <option value="Herramientas" ${tag=='Herramientas'? 'selected':''}>Herramientas</option>
                            <option value="Entretenimiento" ${tag=='Entretenimiento'? 'selected':''}>Entretenimiento</option>
                            <option value="Otros" ${tag=='Otros'? 'selected':''}>Otros</option>
                        </select>
                    </div>
                    <button type="submit" class="filter-button">Filtrar</button>
                </form>
            </div>`;
}