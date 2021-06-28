import React from 'react';
import { SolicitudService } from '../service/SolicitudService';
import '../App.js';
import '../App.css';
import './index';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Cookies from 'universal-cookie';

import { Link } from 'react-router-dom';

const cookies = new Cookies();  

class solicitud extends React.Component {
    constructor(){
        super();
        this.state = ({
            solicitudes:[]

        });
        this.solicitudService = new SolicitudService();

      }

      componentDidMount(){
        this.solicitudService.getAll().then(data => this.setState ({solicitudes: data}));
      }


    render() { 
        return ( 
            <div>
            <div className="page-head"> 
            <div className="container">
                <div className="row">
                    <div className="page-head-content">
                        <h1 className="page-title">Lista de Solicitudes</h1>               
                    </div>
                </div>
            </div>
        </div>

        <div className="properties-area recent-property" style={{ backgroundcolor: '#FFF' }}>
            <div className="container">  
                <div className="row">

                <div className="col-md-12  pr0 padding-top-40 properties-page">
                    <div className="col-md-12 clear"> 
                        <div className="col-xs-10 page-subheader sorting pl0">
                            <ul className="sort-by-list">
                                
                            </ul>

                            <div className="items-per-page">
                                <label htmlFor="items_per_page"><b>Solicitudes por página:</b></label>
                                <div className="sel">
                                    <select id="items_per_page" name="per_page">
                                        <option value="3">3</option>
                                        <option value="6">6</option>
                                        <option value="9">9</option>
                                        <option selected="selected" value="12">12</option>
                                        <option value="15">15</option>
                                        <option value="30">30</option>
                                        <option value="45">45</option>
                                        <option value="60">60</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-2 layout-switcher">
                            <a className="layout-grid active"> <i className="fa fa-th"></i> </a>  
                            <a className="layout-list"> <i className="fa fa-th-list"></i>  </a>                  
                        </div>
                    </div>

                    <div className="col-md-12 clear"> 
                            <div id="list-type" className="proerty-th">
                        {  this.state.solicitudes.map((solicitudes,index) => {
                            let url = "http://127.0.0.1:8050/api/solicitud/"+solicitudes.id+"/"
                            let solicitudID = url?.split('/')[url?.split('/').length - 2]
                            return(
                                <div>
                                    <div className="col-sm-6 col-md-4 p0">
                                            <div className="box-two proerty-item">
                                                <div className="item-thumb">
                                                    <Link to={`/info-solicitud/${solicitudID}`} ><img src="/assets/img/demo/property-3.jpg" alt="img" /></Link>
                                                </div>
                                                <div className="item-entry overflow">
                                                    <h5><Link to={`/info-solicitud/${solicitudID}`} > {(solicitudes.titulo.length>24)?(solicitudes.titulo.substring(0,24)+"..."):(solicitudes.titulo)} </Link></h5>
                                                    <div className="dot-hr"></div>

                                                    <span className="pull-left" field="superficie"><b> Area :</b> {solicitudes.superficie}</span>
                                                                
                                                    <span className="proerty-price pull-right">Presupuesto al mes: S/. {solicitudes.presupuesto}</span>
                                                    <p style={{ display: 'none'}} >Suspendisse ultricies Suspendisse ultricies Nulla quis dapibus nisl. Suspendisse ultricies commodo arcu nec pretium ...</p>
                                                    <div className="property-icon">

                                                        <img src="/assets/img/icon/room.png" alt="img"  />&nbsp;{solicitudes.habitaciones} &nbsp;&nbsp;&nbsp;&nbsp;
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
             </div>              
            </div>
        
        </div> <br/>

        
                        </div>
                                 
                        </div>
 

        {!cookies.get('correo')? 
                (
                    <div style={{marginLeft: "45%"}}>
                    </div>
                ) : (
                    <div style={{marginLeft: "45%"}}>
                        <a className="btn btn-default" href="user-solicitud"> Realizar una solicitud</a>
                     </div>
                )
        }


        <br/><br/>
        </div>

        );
    }
}
 
export default solicitud;

