import React from 'react';
import { UsuarioService } from '../service/UsuarioService';



import { Link } from 'react-router-dom';

import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();


const baseUrl = "http://localhost:8050/api";

class missolicitudes extends React.Component {
    constructor() {
        super();
        this.state = ({
            solicitudes: []
        });
        this.usuarioService = new UsuarioService();
        this.eliminar =this.eliminar.bind(this);

    }

    componentDidMount() {
        this.usuarioService.userAll().then(data => this.setState({ solicitudes: data }));
    }

    async eliminar(xd){
        //let ans = window.confirm('¿Deseas eliminar esta solicitud?');
        await axios.delete(`${baseUrl}/solicitud/${xd}/`).catch(e=>`Error: ${e}`)
        
    }

    render() {
        return (
            <div>
                <div className="page-head">
                    <div className="container">
                        <div className="row">
                            <div className="page-head-content">
                                <h1 className="page-title">Lista de tus Solicitudes</h1>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="content-area recent-property" style={{ backgroundcolor: '#FFF' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12  pr0 padding-top-40 properties-page">
                                    <div class="blog-asside-right">
                                        <div class="panel panel-default sidebar-menu wow fadeInRight animated" >
                                            <div class="panel-heading">
                                                <h3 class="panel-title">Bienvenido, {cookies.get('nombre')}</h3>
                                            </div>
                     
                                        </div>
                                    </div>
                                <div class="section">
                                    <div id="list-type" class="proerty-th-list">
                                        {this.state.solicitudes.map((solicitudes, index) => {
                                            let url = "http://127.0.0.1:8050/api/solicitud/" + solicitudes.id + "/"
                                            let solicitudID = url?.split('/')[url?.split('/').length - 2]
                                            return (
                                                <div class="col-md-4 p0">
                                                    <div class="box-two proerty-item">
                                                        <div class="item-thumb">
                                                        <Link to={`/solicitud-edit/${solicitudID}`} ><img src="/assets/img/demo/property-1.jpg" /></Link>
                                                        </div>

                                                        <div class="item-entry overflow ">
                                                            <h5><Link to={`/solicitud-edit/${solicitudID}`}> {solicitudes.titulo}</Link></h5>
                                                            <div class="dot-hr"></div>
                                                            <span class="pull-left"><b> Area :</b>{solicitudes.superficie} </span>
                                                            <span class="proerty-price pull-right">S/. {solicitudes.presupuesto} al mes</span>
                                                            <p style={{ display: 'none' }}>
                                                                {solicitudes.descripcion}
                                                            </p>
                                                            <div class="property-icon">
                                                                <img src="/assets/img/icon/bed.png" />({solicitudes.habitaciones})|
                                                                <img src="/assets/img/icon/shawer.png" />({solicitudes.banos})|
                                                                <img src="/assets/img/icon/cars.png" />({(solicitudes.cochera) ? ("✓") : ("✘")})

                                                                <div class="dealer-action pull-right">
                                                                <Link to={`/update-solicitud/${solicitudID}`} >Editar </Link>
                                                                <Link to={`/solicitud-edit/${solicitudID}`} >Ver</Link>
                                                             
                                                                <a href="mis-solicitudes"><button onClick={()=>this.eliminar(solicitudID)}>ELIMINAR</button></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        )}

                                    </div>
                                </div>

                                            

                                {/* <div className="col-md-12 clear">
                                        <div id="list-type" className="proerty-th">
                                            {this.state.solicitudes.map((solicitudes, index) => {
                                                let url = "http://127.0.0.1:8050/api/solicitud/" + solicitudes.id + "/"
                                                let solicitudID = url?.split('/')[url?.split('/').length - 2]
                                                return (
                                                    <div>
                                                        <div className="col-sm-6 col-md-4 p0">
                                                            <div className="box-two proerty-item">
                                                                <div className="item-thumb">
                                                                    <Link to={`/solicitud-edit/${solicitudID}`} ><img src="/assets/img/demo/property-3.jpg" alt="img" /></Link>
                                                                </div>
                                                                <div className="item-entry overflow">
                                                                    <h5><Link to={`/solicitud-edit/${solicitudID}`}> {(solicitudes.titulo.length > 24) ? (solicitudes.titulo.substring(0, 24) + "...") : (solicitudes.titulo)} </Link></h5>
                                                                    <div className="dot-hr"></div>
    
                                                                    <span className="pull-left" field="superficie"><b> Area :</b> {solicitudes.presupuesto}</span>
    
                                                                    <span className="proerty-price pull-right"> {solicitudes.superficie}</span>
                                                                    <p style={{ display: 'none' }} max="5">Suspendisse ultricies Suspendisse ultricies Nulla quis dapibus nisl. Suspendisse ultricies commodo arcu nec pretium ...</p>
                                                                    <div className="property-icon">
    
                                                                        <img src="/assets/img/icon/room.png" alt="img" />&nbsp;{solicitudes.habitaciones} &nbsp;&nbsp;&nbsp;&nbsp;
                                                                        <img src="/assets/img/icon/shawer.png" alt="img" />&nbsp;{solicitudes.banos}
    
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    </div>  */}









                            </div>
                        </div>
                    </div>

                </div>
                <br />
                {!cookies.get('correo') ?
                    (
                        <div style={{ marginLeft: "45%" }}>
                        </div>
                    ) : (
                        <div style={{ marginLeft: "45%" }}>
                            <a className="btn btn-default" href="user-solicitud"> Realizar una solicitud</a>
                        </div>
                    )
                }

                <br />     <br />

            </div>

        );
    }
}

export default missolicitudes;

