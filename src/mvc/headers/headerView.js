
export const logoutNavbar = (u) => {
    return `<ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <button class="nav-link btn btn-link new-product">Crear producto</button>
                    </li>
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

export const loginNavbar = () => {
     return `<ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="../login/login.html">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./singup/singup.html">Signup</a>
                    </li>
                </ul>`;
}