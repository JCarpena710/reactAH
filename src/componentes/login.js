import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl = "http://localhost:8050/api";
const cookies = new Cookies();

class login extends React.Component {
    state = {
        form: {
            correo: '',
            password: ''
        },
        respuesta: {
        }
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value.replace(/\s/g,'')
            }
        });
    }

    iniciarSesion = async () => {

        let apiRes = {};
        try {
            apiRes = await axios.post(baseUrl + "/usuarios/login/",
                {
                    correo: this.state.form.correo, password: this.state.form.password,
                    validateStatus: (status) => status === 200
                })
        } catch (err) {
            apiRes = err.response;
            if(this.state.form.correo.length === 0|| this.state.form.password.length === 0){
                alert("Por favor no dejes tus credenciales en blanco")
            }else{
            alert (`Error ${apiRes.status}: El usuario no existe`);
            }
        }
        if (apiRes.status !== 404){
        let data = apiRes.data;
        cookies.set('id', data.id, { path: "/" });
        cookies.set('apellido', data.apellido, { path: "/" });
        cookies.set('nombre', data.nombre, { path: "/" });
        cookies.set('correo', data.correo, { path: "/" });
        alert(`Bienvenido ${data.nombre} ${data.apellido}`);
        window.location.href = "./index";
        console.log("Conectadode manera satisfactoria");}else{
            window.location.href ="/login";
        }
    }

    componentDidMount() {


        if (cookies.get('correo')) {
            window.location.href = "./login2";
        }
    }
    render() {
        return (
            <div>
                <div>
                    <div className="page-head">
                        <div className="container">
                            <div className="row">
                                <div className="page-head-content">
                                    <h1 className="page-title">Sign in </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />    <br />
                    <div className="register-area" style={{ backgroundColor: 'rgb(249, 249, 249)' }}>
                        <div className="container" >

                            <div className="col-md-7" style={{ marginLeft: "25%" }} >
                                <div className="box-for overflow">
                                    <div className="col-md-12 col-xs-12 login-blocks">
                                        <h2>Login : </h2>
                                        <form action="" method="post">
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="text" className="form-control" name="correo" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" className="form-control" name="password" onChange={this.handleChange} />
                                            </div>
                                            <div className="text-center">
                                                <button className="btn btn-default" onClick={() => this.iniciarSesion()}>Iniciar Sesión</button>
                                            </div>
                                        </form>

                                        <br />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <br />    <br />
                </div>
            </div>
        );
    }
}

export default login;