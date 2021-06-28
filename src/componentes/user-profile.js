import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';


const baseUrl = "http://127.0.0.1:8050/api";
const cookies = new Cookies();

class userprofile extends React.Component {
    constructor(props) {
    super(props);
        this.state = ({
            id: '',
            nombre: '',
            apellido: '',
            correo: '',
            password: '',
            telefono: '',
            celular: '',
            tnombre: '',
            tapellido: ''
        })

        this.cambioNombre = this.cambioNombre.bind(this);
        this.cambioApellido = this.cambioApellido.bind(this);
        this.cambioCorreo = this.cambioCorreo.bind(this);
        this.cambioPassword = this.cambioPassword.bind(this);
        this.cambioCelular = this.cambioCelular.bind(this);
        this.cambioTelefono = this.cambioTelefono.bind(this);
        this.save = this.save.bind(this);

    }

    componentDidMount() {
        if (!cookies.get('correo')) {
            window.location.href = "./";
        }
        try {
            axios.get(baseUrl + `/usuarios/${cookies.get('id')}/`).then
                (res => {
                    this.setState({
                        id: res.data.id,
                        nombre: res.data.nombre,
                        apellido: res.data.apellido,
                        correo: res.data.correo,
                        password: res.data.password,
                        telefono: res.data.telefono,
                        celular: res.data.celular,
                        tnombre: res.data.nombre,
                        tapellido: res.data.apellido
                    })
                })
        }
        catch (err) {
            alert(`Error: ${err}`)
            window.location.href = "/login";
        }
    }


    cambioNombre(e) {
        this.setState({
            nombre: e.target.value
        });
    }

    cambioApellido(e) {
        this.setState({
            apellido: e.target.value
        });
    }

    cambioCorreo(e) {
        this.setState({
            correo: e.target.value
        });
    }

    cambioPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    cambioCelular(e) {
        this.setState({
            celular: e.target.value
        });
    }

    cambioTelefono(e) {
        this.setState({
            telefono: e.target.value
        });
    }

    save(e) {
        e.preventDefault();
        let info = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            correo: this.state.correo,
            password: this.state.password,
            celular: this.state.celular,
            telefono: this.state.telefono
        }
        axios.put(baseUrl + `/usuarios/${cookies.get('id')}/`, info).catch((e) => {
            alert(`Error: ${e}`)
        })

        alert(`Se ha editado el perfil de manera exitosa `)
        window.location.href = "/user-profile";

    }

    render() {
        return (
            <div>
                <div className="page-head">
                    <div className="container">
                        <div className="row">
                            <div className="page-head-content">
                                <h1 className="page-title">Hola : <span className="orange strong">{this.state.tnombre} {this.state.tapellido}</span></h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-area user-profiel" style={{ backgroundColor: '#FCFCFC' }}>&nbsp;
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2 col-sm-offset-3 col-lg-7 profiel-container">

                                <form onSubmit={this.save}>
                                    <div className="profiel-header">
                                        <h3>
                                            <b>Mi</b> perfil <br />
                                            <small>Tu información personal</small>
                                        </h3>
                                        <hr />
                                    </div>

                                    <div className="clear">

                                        <div className="col-sm-5 padding-top-2"  style={{marginLeft: "55px"}}>

                                            <div className="form-group">
                                                <label>Nombres <small>(required)</small></label>
                                                <input  type="text" className="form-control" value={this.state.nombre} onChange={this.cambioNombre} ></input>
                                            </div>
                                            <div className="form-group">
                                                <label>Apellidos <small>(required)</small></label>
                                                <input  type="text" className="form-control" value={this.state.apellido} onChange={this.cambioApellido} ></input>
                                            </div>    </div>
                                        <div className="col-sm-5 padding-top-2">
                                            <div className="form-group">
                                                <label>Correo <small>(required)</small></label>
                                                <input  type="text" className="form-control" value={this.state.correo} onChange={this.cambioCorreo} ></input>
                                            </div>
                                        
                                        </div>
                                        <div className="col-sm-5 padding-top-2">
                                            <div className="form-group">
                                                <label>Contraseña <small>(required)</small></label>
                                                <input  type="password" className="form-control" value={this.state.password} onChange={this.cambioPassword} ></input>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="clear">

                                        <div className="col-sm-5"  style={{marginLeft: "55px"}}>
                                            <div className="form-group">
                                                <label>Telefono :</label>
                                                <input  type="text" className="form-control" value={this.state.telefono} onChange={this.cambioTelefono} ></input>
                                            </div>  </div>
                                            <div className="col-sm-5">
                                            <div className="form-group">
                                                <label>Celular :</label>
                                                <input  type="text" className="form-control" value={this.state.celular} onChange={this.cambioCelular}></input>
                                            </div>  </div>
                                      

                                    </div>

                                    <div className="col-sm-9 col-sm-offset-5 padding-top-25">
                                        <br />
                                        <input type='submit' className='btn btn-finish btn-primary' name='finish' value='Editar' />
                                    </div>
                                    <br />
                                </form>

                            </div>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}

export default userprofile;