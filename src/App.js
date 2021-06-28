import './App.css';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import "react-router-dom";
import Cookies from 'universal-cookie';
import React from 'react';
import { cerrarSesion } from './util/xd';

import index from "./componentes/index";
import register from "./componentes/register";
import login from "./componentes/login";
import login2 from './componentes/login2';
import solicitud from "./componentes/solicitud";
import usersolicitud from "./componentes/user-solicitud";
import missolicitudes from './componentes/mis-solicitudes';
import infosolicitud from "./componentes/info-solicitud";
import solicitudedit from "./componentes/solicitud-edit";

import updatesolicitud from "./componentes/update-solicitud";

import changepassword from "./componentes/change-password";
import contact from "./componentes/contact";
import faq from "./componentes/faq";


import userprofile from "./componentes/user-profile";

const cookies = new Cookies();

function App() {
  return (
    <Router>
         <div id="preloader">
            <div id="status">&nbsp;</div>
        </div>
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/index"><img src="/assets/img/logo.png" alt="img" ></img></a>
                </div>

                <div className="collapse navbar-collapse yamm" id="navigation">
                    {!cookies.get('correo')? 
                        (
                            <div className="button navbar-right" style={{marginTop: "12px"}}>

                                <Link className="navbar-btn nav-button wow bounceInRight login" to='/login' data-wow-delay="0.4s">Login</Link>
                                <Link className="navbar-btn nav-button wow fadeInRight" to='/register' data-wow-delay="0.5s">Register</Link>
                        
                            </div>

                            
                        ) : (
                            <div className="button navbar-right" style={{marginTop: "12px"}}>
                                <Link className="navbar-btn nav-button wow bounceInRight login" to='/user-profile' data-wow-delay="0.4s">Perfil</Link> 
                                <Link className="navbar-btn nav-button wow fadeInRight" onClick={()=>cerrarSesion()} data-wow-delay="0.5s" href="index">Cerrar Sesin</Link>

                            </div>
                        )
                    }


                    {!cookies.get('correo')? 
                        (
                            <ul className="main-nav nav navbar-nav navbar-right">
                                <li className="wow fadeInDown" data-wow-delay="0.2s"><a href="/index">Hogar</a></li>
                                
                                <li className="wow fadeInDown" data-wow-delay="0.1s"><Link  to="/solicitud">Solicitudes</Link></li>
        
                                <li className="wow fadeInDown" data-wow-delay="0.4s"><Link to="/contact">Contactanos</Link></li>
                            </ul>

                            
                        ) : (
                            <ul className="main-nav nav navbar-nav navbar-right">
                                <li className="wow fadeInDown" data-wow-delay="0.2s"><a  href="/index">Hogar</a></li>
        
                                <li className="wow fadeInDown" data-wow-delay="0.1s"><Link  to="/mis-solicitudes">Mis solicitudes</Link></li>
                                
                                <li className="wow fadeInDown" data-wow-delay="0.1s"><Link  to="/solicitud">Solicitudes</Link></li>
        
                                <li className="wow fadeInDown" data-wow-delay="0.4s"><Link to="/contact">Contactanos</Link></li>
                            </ul>
                        )
                    }

                </div>
            </div>
        </nav>




       <Switch>
      <Route exact path="/" component={index}></Route>
      <Route exact path="/index" component={index}></Route>
      <Route path="/register" component={register}></Route>
      <Route path="/login" component={login}></Route>
      <Route path="/login2" component={login2}></Route>
      <Route path="/user-profile" component={userprofile}></Route>

      <Route  path="/solicitud" component={solicitud}></Route>
      <Route  path="/user-solicitud" component={usersolicitud}></Route>
      <Route path="/mis-solicitudes" component={missolicitudes}></Route>
      <Route path="/info-solicitud/:solicitudID" component={infosolicitud} ></Route>

      <Route path="/solicitud-edit/:solicitudID" component={solicitudedit}></Route>

      <Route path="/update-solicitud/:solicitudID" component={updatesolicitud}></Route>



      <Route  path="/contact" component={contact}></Route>

      <Route path="/change-password" component={changepassword}></Route>
      <Route path="/faq" component={faq}></Route>
      </Switch>







      <div className="footer-area">

<div className=" footer">
    <div className="container">
        <div className="row">

            <div className="col-md-4 col-sm-6 wow fadeInRight animated">
                <div className="single-footer">
                    <h4>Sobre nosotros </h4>
                    <div className="footer-title-line"></div>

                    <img src="/assets/img/footer-logo.png" alt="img" className="wow pulse" data-wow-delay="1s" />
                    <p>Lorem ipsum dolor cum necessitatibus su quisquam molestias. Vel unde, blanditiis.</p>
                    <ul className="footer-adress">
                        <li><i className="pe-7s-map-marker strong"> </i> 1234</li>
                        <li><i className="pe-7s-mail strong"> </i> email@idk.com</li>
                        <li><i className="pe-7s-call strong"> </i> +51 999 999 999</li>
                    </ul>
                </div>
            </div>
            <div className="col-md-4 col-sm-6 wow fadeInRight animated">
                <div className="single-footer">
                    <h4>Otros enlaces </h4>
                    <div className="footer-title-line"></div>
            {!cookies.get('correo')? 
                (
                    <ul className="footer-menu">
                        <li><a href="/contact">contact</a></li> 
                        <li><a href="/faq">faq us</a></li> 
                    </ul>

                    
                ) : (
                    <ul className="footer-menu">
                        <li><a href="/contact">contact</a></li> 
                        <li><a href="/faq">faq us</a></li> 
                        <li><a href="/mis-solicitudes">Mis solicitudes</a>  </li> 
                    </ul>
                )
            }


                </div>         
            </div>
            
            <div className="col-md-4 col-sm-6 wow fadeInRight animated">
                <div className="single-footer news-letter">
                    <h4>MANTENTE EN CONTACTO</h4>
                    <div className="footer-title-line"></div>
                    <p>Lorem ipsum dolor sit amet, nulla  suscipit similique quisquam molestias. Vel unde, blanditiis.</p>

                    <form>
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder="E-mail ... " />
                            <span className="input-group-btn">
                                <button className="btn btn-primary subscribe" type="button"><i className="pe-7s-paper-plane pe-2x"></i></button>
                            </span>
                        </div>
            
                    </form> 

                    <div className="social pull-right"> 
                        <ul>
                            <li><a className="wow fadeInUp animated" href="/xd"><i className="fa fa-twitter"></i></a></li>&nbsp;
                            <li><a className="wow fadeInUp animated" href="/xd" data-wow-delay="0.2s"><i className="fa fa-facebook"></i></a></li>&nbsp;
                            <li><a className="wow fadeInUp animated" href="/xd" data-wow-delay="0.3s"><i className="fa fa-google-plus"></i></a></li>&nbsp;
                            <li><a className="wow fadeInUp animated" href="/xd" data-wow-delay="0.4s"><i className="fa fa-instagram"></i></a></li>&nbsp;
                            <li><a className="wow fadeInUp animated" href="/xd" data-wow-delay="0.6s"><i className="fa fa-dribbble"></i></a></li>
                        </ul> 
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

            <div className="footer-copy text-center">
                <div className="container">
                    <div className="row">
                        <div className="pull-left">
                 
                        </div> 
                        <div className="bottom-menu pull-right"> 
                            <ul> 
                                <li><a href="index" className="wow fadeInUp animated" data-wow-delay="0.2s">Home</a></li>
                                <li><a href="solicitud" className="wow fadeInUp animated" data-wow-delay="0.3s">Solicitudes</a></li>
                                <li><a href="faq" className="wow fadeInUp animated" data-wow-delay="0.4s">Faq</a></li>
                                <li><a href="contact" className="wow fadeInUp animated" data-wow-delay="0.6s">Contacto</a></li>
                            </ul> 
                        </div>
                    </div>
                </div>
            </div>
   
        </div>
    </Router>
  );
}

export default App;
