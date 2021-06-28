import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class login2 extends Component {
    
    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('apellido_paterno', {path: "/"});
        cookies.remove('apellido_materno', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('correo', {path: "/"});
        window.location.href='./';
    }

    componentDidMount() {
        if(!cookies.get('correo')){
            window.location.href="./";
        }
    }

    render() {
        console.log('id: '+ cookies.get('id'));
        console.log('apellido_paterno: '+cookies.get('apellido_paterno'));
        console.log('apellido_materno: '+cookies.get('apellido_materno'));
        console.log('nombre: '+cookies.get('nombre'));
        console.log('correo: '+cookies.get('correo'));
        return (
        
            <div style={{ margin: "5%", marginLeft: "45%"}}>
                <button className="btn btn-default" onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
                <h1>{cookies.get('id')}</h1>
            </div>
        );
    }
}

export default login2;