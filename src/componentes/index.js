import React from 'react';
import '../App.js';
import '../App.css';
import { Link } from 'react-router-dom';
import { SolicitudService } from '../service/SolicitudService';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class index extends React.Component {
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
                <div className="slider-area">
                    <div className="slider">
                        <div id="bg-slider" className="owl-carousel owl-theme">

                            <div className="item"><img src="/assets/img/slide1/slider-image-1.jpg" alt="img" /></div>
                            <div className="item"><img src="/assets/img/slide1/slider-image-2.jpg" alt="img" /></div>
                            <div className="item"><img src="/assets/img/slide1/slider-image-1.jpg" alt="img" /></div>

                        </div>
                    </div>

                    <div className="slider-content">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12">
                                <br /><br /><br /><br />
                                <h2>property Searching Just Got So Easy</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi deserunt deleniti, ullam commodi sit ipsam laboriosam velit adipisci quibusdam aliquam teneturo!</p>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="content-area home-area-1 recent-property" style={{ backgroundcolor: '#FCFCFC', paddingbottom: '55px' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1 col-sm-12 text-center page-title">

                                <h2>Algunas solicitudes</h2>
                                <p>Te mostramos las solicitudes algunos de tus nuevos potenciales compradores</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="proerty-th">
                                
                                {
                                    
                                this.state.solicitudes.slice(0, 7).map((solicitudes, index) => {
                                            let url = "http://127.0.0.1:8050/api/solicitud/" + solicitudes.id + "/"
                                            let solicitudID = url?.split('/')[url?.split('/').length - 2]
                                            
                                            return(
                                            
                                        <div className="col-sm-6 col-md-3 p0">
                                         <div className="box-two proerty-item">
                                         <div className="item-thumb">
                                         <Link to={`/info-solicitud/${solicitudID}`} ><img src="/assets/img/demo/property-1.jpg" alt="img" /></Link>
                                         </div>
                                         <div className="item-entry overflow">
                                         <h5><Link to={`/info-solicitud/${solicitudID}`} > {(solicitudes.titulo.length > 24) ?
                                          (solicitudes.titulo.substring(0, 24) + "...") : (solicitudes.titulo)} </Link></h5>
                                             <div className="dot-hr"></div>
                                             <p>{(solicitudes.descripcion.length >34)?
                                             (solicitudes.descripcion.substring(0,34)+"..."):
                                             (solicitudes.descripcion)}</p>
                                             <span className="pull-left" field="superficie"><b>  Area :</b> {solicitudes.superficie}</span>
                                             <span className="proerty-price pull-right">S/. {solicitudes.presupuesto} al mes</span>
                                         </div>
                                     </div>
                                    </div>
                                    )
                                })
                                }
                                <Link to="/solicitud">
                                <div className="col-sm-6 col-md-3 p0">
                                    <div className="box-tree more-proerty text-center">
                                        <div className="item-tree-icon">
                                            <i className="fa fa-th"></i>
                                        </div>

                                        <div className="more-entry overflow">

                                            <h5>CAN'T DECIDE ?</h5>
                                            <h5 className="tree-sub-ttl">Show all properties</h5>
                                            <button className="btn border-btn more-black">Todas las solicitudes</button>
                                        </div>

                                    </div>
                                </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="Welcome-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 Welcome-entry  col-sm-12">
                                <div className="col-md-5 col-md-offset-2 col-sm-6 col-xs-12">
                                    <div className="welcome_text wow fadeInLeft" data-wow-delay="0.3s" data-wow-offset="100">
                                        <div className="row">
                                            <div className="col-md-10 col-md-offset-1 col-sm-12 text-center page-title">

                                                <h2>ALOHA HOME </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 col-sm-6 col-xs-12">
                                    <div className="welcome_services wow fadeInRight" data-wow-delay="0.3s" data-wow-offset="100">
                                        <div className="row">
                                            <div className="col-xs-12 m-padding">
                                                <div className="welcome-estate">
                                                    <Link to="/solicitud">
                                                    <div className="welcome-icon">
                                                        <i className="pe-7s-home pe-4x"></i>
                                                    </div>
                                                    <h3>Solicitudes</h3></Link>
                                                </div>
                                            </div>


                                            <div className="col-xs-12 text-center">
                                                <i className="welcome-circle"></i>
                                            </div>

                                            <div className="col-xs-6 m-padding">
                                                <div className="welcome-estate">
                                                    <a href="/contact">
                                                    <div className="welcome-icon">
                                                        <i className="pe-7s-notebook pe-4x"></i>
                                                    </div>
                                                    <h3>contact</h3></a>
                                                </div>
                                            </div>
                                            <div className="col-xs-6 m-padding">
                                                <div className="welcome-estate">
                                                    <a href="/faq"> 
                                                    <div className="welcome-icon">
                                                        <i className="pe-7s-help2 pe-4x"></i>
                                                    </div>
                                                    <h3>Any help </h3></a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br /><br /><br /><br /><br /><br />


            </div>
        );
    }
}

export default index;