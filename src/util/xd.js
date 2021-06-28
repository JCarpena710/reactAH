import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const cerrarSesion=()=>{
    cookies.remove('id', {path: "/"});
        cookies.remove('apellido_paterno', {path: "/"});
        cookies.remove('apellido_materno', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('correo', {path: "/"});
        alert("Has cerrado tu sesión");
        window.location.href='./'
}