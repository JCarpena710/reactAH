import React from 'react';
import '../App.css';
import { UsuarioService } from '../service/UsuarioService';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


class register extends React.Component {
    constructor(){
        super();
        this.state = {
          visible : false,
          usuario: {
            id: null,
            correo: null,
            nombre: null,
            apellido: null,
            password: null,
            telefono: null,
            celular: null,
            token: null
          },
          selectedUsuario : {
    
          }
        };
        this.items = [
          {
            label : 'Nuevo',
            icon : 'pi pi-fw pi-plus',
            command : () => {this.showSaveDialog()}
          }
        ];
    
        this.usuarioService = new UsuarioService();
        this.save = this.save.bind(this);

      }
    
      componentDidMount(){
        this.usuarioService.getAll().then(data => this.setState ({usuarios: data}))
      }
      save() {
        this.usuarioService.save(this.state.usuario).then(data => {
        this.setState({
          visible : false,
          usuario : {
            id: null,
            correo: null,
            nombre: null,
            apellido: null,
            password: null,
            telefono: null,
            celular: null,
            token: null
          }
        });
        this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
        this.usuarioService.getAll().then(data => this.setState({usuarios: data}))
       })
      }
    
    
      

    render() { 
        return ( 
        <div>
        <div className="page-head"> 
            <div className="container">
                <div className="row">
                    <div className="page-head-content">
                        <h1 className="page-title">Home New account</h1>               
                    </div>
                </div>
            </div>
        </div>
        <br/>  
        
        <div className="register-area" style={{backgroundcolor: 'rgb(249, 249, 249)'}}>
            <div className="container" >

                <div className="col-md-10">
                    <div className="box-for overflow" style={{marginLeft: "30%"}}>
                        <div className="col-md-12 col-xs-12 register-blocks">
                            <h2>Nueva Cuenta : </h2> 
                            <form id="usuario-form">
                                <div className="form-group">
                                    <label htmlFor="nombres">Nombres</label>
                                    <input  className="form-control" value={this.state.usuario.nombre} id="nombre" onChange={(e) => {
                                      let val = e.target.value;
                                      this.setState(prevState => {
                                          let usuario = Object.assign({}, prevState.usuario);
                                          usuario.nombre = val;

                                          return { usuario };
                                      })}
                                    } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="apellidos">Apellidos</label>
                                    <input className="form-control"  value={this.state.usuario.apellido} id="apellido" onChange={(e) => {
                                      let val = e.target.value;
                                      this.setState(prevState => {
                                          let usuario = Object.assign({}, prevState.usuario);
                                          usuario.apellido = val

                                          return { usuario };
                                      })}
                                    } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Correo Electrónico</label>
                                    <input  className="form-control" type="text" value={this.state.usuario.correo}  id="correo" onChange={(e) => {
                                      let val = e.target.value;
                                      this.setState(prevState => {
                                          let usuario = Object.assign({}, prevState.usuario);
                                          usuario.correo = val;

                                          return { usuario };
                                      })}
                                    } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Contraseña</label>
                                    <input className="form-control"  type="password" value={this.state.usuario.password} id="password" onChange={(e) => {
                                      let val = e.target.value;
                                      this.setState(prevState => {
                                          let usuario = Object.assign({}, prevState.usuario);
                                          usuario.password = val;

                                          return { usuario };
                                      })}
                                    } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telefono">Teléfono</label>
                                    <input className="form-control"   type="number" value={this.state.usuario.telefono} id="telefono" onChange={(e) => {
                                      let val = e.target.value;
                                      this.setState(prevState => {
                                          let usuario = Object.assign({}, prevState.usuario);
                                          usuario.telefono = val

                                          return { usuario };
                                      })}
                                    } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="celular">Celular</label>
                                    <input className="form-control"  type="number" value={this.state.usuario.celular} id="celular" onChange={(e) => {
                                      let val = e.target.value;
                                      this.setState(prevState => {
                                          let usuario = Object.assign({}, prevState.usuario);
                                          usuario.celular = val;

                                          return { usuario };
                                      })}
                                    } />
                                </div>
                                <div className="text-center">
                                  <button  className="btn btn-default" onClick={this.save}>Registrarse</button>
                                </div>
                            </form>
                            <Toast  ref={(el) => this.toast = el} />
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
        </div>                          
   


    
        );
    }
    
    showSaveDialog(){
        this.setState({
          visible : true,
          usuario : {
            id: null,
            correo: null,
            nombre: null,
            apellido: null,
            password: null,
            telefono: null,
            celular: null,
            token: null
          }
        });
        document.getElementById('usuario-form');
      }

}
 
export default register;
