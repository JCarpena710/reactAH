import React from 'react';

class contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div>
            <div className="page-head"> 
                <div className="container">
                    <div className="row">
                        <div className="page-head-content">
                            <h1 className="page-title">Página de contacto</h1>               
                        </div>
                    </div>
                </div>
            </div>
    
    
            <div className="content-area recent-property padding-top-40" style={{backgroundcolor: '#FFF'}}>
                <div className="container">  
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2"> 
                            <div className="" id="contact1">                        
                                <div className="row" >
                                    <div className="col-sm-4">
                                        <h3><i className="fa fa-map-marker"></i> Direcciones</h3>
                                        <p>Av. ---
                                            <br/>--- 
                                            <br/>---
                                            <br/>
                                            <strong>Perú</strong>
                                        </p>
                                    </div>
                  
                                    <div className="col-sm-4">
                                        <h3><i className="fa fa-phone"></i> Centro de llamadas</h3>
                                        <p className="text-muted">Este número es gratuito si llama desde Perú; de lo contrario, le recomendamos que utilice la forma de comunicación electrónica.</p>
                                        <p><strong>+51 987 321 654</strong></p>
                                    </div>
                  
                                    <div className="col-sm-4">
                                        <h3><i className="fa fa-envelope"></i> Soporte electrónico</h3>
                                        <p className="text-muted">No dude en escribirnos un correo electrónico o utilizar nuestro sistema de venta de entradas electrónicas.</p>
                                        <ul>
                                            <li><strong><a href="mailto:">contact@company.com</a></strong>   </li>
                                            <li><strong><a href="mailto:">contact@company.com</a></strong>   </li>
                                        </ul>
                                    </div>
                       
                                </div>
                                <br/><br/>
                                <hr/>
    
                                <h2>Contáctanos</h2>
                                <form>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="firstname">Nombres</label>
                                                <input type="text" className="form-control" id="firstname" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="lastname">Apellidos</label>
                                                <input type="text" className="form-control" id="lastname" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="text" className="form-control" id="email" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="subject">Correo Electrónico</label>
                                                <input type="text" className="form-control" id="subject" />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="message">Mensaje</label>
                                                <textarea id="message" className="form-control" rows="7"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 text-center">
                                            <button type="submit" className="btn btn-primary"><i className="fa fa-envelope-o"></i>  Enviar mensaje</button>
                                        </div>
                                    </div>
                   
                                </form>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </div> 
        );
    }
}
 
export default contact;