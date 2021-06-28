import React, { Component } from 'react';

import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";

import axios from 'axios';
import Stripe from "react-stripe-checkout";
import { District, Region, Province } from "ubigeos";
import '../App.js'
import '../App.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class solicitudedit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            solid:0,
            solicituduserid: '',
            solicitudTitulo: "",
            solicitudDistrito: "",
            solicitudProvincia: '',
            solicitudRegion: '',
            solicitudDescripcion: '',
            solicitudPresupuesto: 0.0,
            solicitudSuperficie: 0,
            solicitudTipo: "",
            solicitudHabitaciones: 0,
            solicitudBanos: 0,
            solicitudCochera: false,
            solicitudEstado: false,
            solnomRegion: "",
            solnomProvincia: "",
            solnomDistrito: "",
            respestado: 0
        };

        this.handleToken = this.handleToken.bind(this);
    }


    componentDidMount() {
        const { match } = this.props;
        const solId = match.params.solicitudID
        const solicitudeditUrl = `${process.env.REACT_APP_POKE_API_BASE_URL}solicitud/${solId}/`;
        axios.get(solicitudeditUrl)
            .then(res => {
                this.setState({
                    solid:res.data.id,
                    solicituduserid: res.data.usuarioid,
                    solicitudTitulo: res.data.titulo,
                    solicitudDistrito: res.data.distrito,
                    solicitudProvincia: res.data.provincia,
                    solicitudRegion: res.data.departamento,
                    solicitudPresupuesto: res.data.presupuesto,
                    solicitudSuperficie: res.data.superficie,
                    solicitudTipo: res.data.tiposol,
                    solicitudHabitaciones: res.data.habitaciones,
                    solicitudBanos: res.data.banos,
                    solicitudCochera: res.data.cochera,
                    solicitudEstado: res.data.estado,
                    solicitudDescripcion: res.data.descripcion

                }
                )
                let a = Region.instance(res.data.departamento).getName();
                this.setState({ solnomRegion: a });
                let b = Province.instance(res.data.provincia).getName();
                this.setState({ solnomProvincia: b });
                let c = District.instance(res.data.distrito).getName();
                this.setState({ solnomDistrito: c });
                axios.post("http://127.0.0.1:8050/api/pagos/check/", {
                    solicitanteid: res.data.usuarioid,
                    compradorid: cookies.get('id'),
                    validateStatus: (status) => status === 200
                }).then(res => {
                     this.setState({respestado:res.status}) 
                }).catch((e) => {
                    this.setState({ respestado: e.response.status })
                })
            })
    }

    async handleToken(token) {
        alert(this.state.respestado)
        let apiRes1 = {};
        alert(`id user:${this.state.solicituduserid} id comprador: ${cookies.get('id')} `);
        try {
            console.log(token);
            apiRes1 = await axios.post(`http://127.0.0.1:8050/api/pagos/`,
                {
                    solicitanteid: this.state.solicituduserid,
                    compradorid: cookies.get('id'),
                    validateStatus: (status) => status === 201
                })
            await axios.post(`http://127.0.0.1:8050/api/payment/charge`, "", {
                headers: {
                    token: token.id,
                    amount: 8,
                }
            })
            alert(`${apiRes1.status} - Pago creado exitosamente`);
        } catch (err) {
            apiRes1 = err.response;
            alert(`Error ${apiRes1.status}`);
        }

        /* await axios
            .post("http://localhost:8050/api/payment/charge", "", {
                headers: {
                    token: token.id,
                    amount: 3,
                },
            })
            .then(() => {
                try{
                let inspg={
                    solicitanteid:this.state.usuarioid,
                    compradorid:cookies.get('id'),
                }
                axios.post(`${REACT_APP_POKE_API_BASE_URL}/pagos/`,inspg)
                }catch{

                }
            }).then(()=>{
                alert("Payment Success");
            })
            .catch((error) => {
                alert(error);
            }); */
    }



    render() {
        return (
            <div>
                <div className="page-head">
                    <div className="container">
                        <div className="row">
                            <div className="page-head-content">
                                <h1 className="page-title">Descripción de la solicitud </h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-area single-property" style={{ backgroundColor: '#FCFCFC' }}>
                    <div className="container">

                        <div className="clearfix padding-top-40">
                            <div className="col-md-12 single-property-content ">
                                <div className="row">
                                    <div className="light-slide-item">
                                        <div className="clearfix">
                                            <div className="favorite-and-print">
                                                <a className="add-to-fav" href="#login-modal" data-toggle="modal">
                                                    <i className="fa fa-star-o"></i>
                                                </a>
                                                <a className="printer-icon " href="index">
                                                    <i className="fa fa-print"></i>
                                                </a>
                                            </div>

                                            <ul id="image-gallery" className="gallery list-unstyled cS-hidden">
                                                <li data-thumb="assets/img/property-1/property1.jpg">
                                                    <img src="/assets/img/property-1/property1.jpg" alt="img" />
                                                </li><br />
                                                <li data-thumb="assets/img/property-1/property3.jpg">
                                                    <img src="/assets/img/property-1/property3.jpg" alt="img" />
                                                </li><br />
                                                <li data-thumb="assets/img/property-1/property4.jpg">
                                                    <img src="/assets/img/property-1/property4.jpg" alt="img" />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="single-property-wrapper">
                                    <div className="single-property-header">
                                        <h1 className="property-title pull-left" >{this.state.solicitudTitulo}</h1>
                                        <span className="property-price pull-right">S/.{this.state.solicitudPresupuesto} al mes</span>
                                    </div>

                                    <div className="property-meta entry-meta clearfix ">

                                        <div className="col-xs-3 col-sm-3 col-md-3 p-b-15">
                                            <span className="property-info-icon icon-tag">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                                                    <path className="meta-icon" fill-rule="evenodd" clip-rule="evenodd" fill="#FFA500" d="M47.199 24.176l-23.552-23.392c-.504-.502-1.174-.778-1.897-.778l-19.087.09c-.236.003-.469.038-.696.1l-.251.1-.166.069c-.319.152-.564.321-.766.529-.497.502-.781 1.196-.778 1.907l.092 19.124c.003.711.283 1.385.795 1.901l23.549 23.389c.221.218.482.393.779.523l.224.092c.26.092.519.145.78.155l.121.009h.012c.239-.003.476-.037.693-.098l.195-.076.2-.084c.315-.145.573-.319.791-.539l18.976-19.214c.507-.511.785-1.188.781-1.908-.003-.72-.287-1.394-.795-1.899zm-35.198-9.17c-1.657 0-3-1.345-3-3 0-1.657 1.343-3 3-3 1.656 0 2.999 1.343 2.999 3 0 1.656-1.343 3-2.999 3z"></path>
                                                </svg>
                                            </span>
                                            <span className="property-info-entry">
                                                <span className="property-info-label">Status:</span>
                                                <span className="property-info-value">{(this.state.solicitudEstado) ? ("Activo") : ("Inactivo")}</span>
                                            </span>
                                        </div>

                                        <div className="col-xs-3 col-sm-3 col-md-3 p-b-15">
                                            <span className="property-info icon-area">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                                                    <path className="meta-icon" fill="#FFA500" d="M46 16v-12c0-1.104-.896-2.001-2-2.001h-12c0-1.103-.896-1.999-2.002-1.999h-11.997c-1.105 0-2.001.896-2.001 1.999h-12c-1.104 0-2 .897-2 2.001v12c-1.104 0-2 .896-2 2v11.999c0 1.104.896 2 2 2v12.001c0 1.104.896 2 2 2h12c0 1.104.896 2 2.001 2h11.997c1.106 0 2.002-.896 2.002-2h12c1.104 0 2-.896 2-2v-12.001c1.104 0 2-.896 2-2v-11.999c0-1.104-.896-2-2-2zm-4.002 23.998c0 1.105-.895 2.002-2 2.002h-31.998c-1.105 0-2-.896-2-2.002v-31.999c0-1.104.895-1.999 2-1.999h31.998c1.105 0 2 .895 2 1.999v31.999zm-5.623-28.908c-.123-.051-.256-.078-.387-.078h-11.39c-.563 0-1.019.453-1.019 1.016 0 .562.456 1.017 1.019 1.017h8.935l-20.5 20.473v-8.926c0-.562-.455-1.017-1.018-1.017-.564 0-1.02.455-1.02 1.017v11.381c0 .562.455 1.016 1.02 1.016h11.39c.562 0 1.017-.454 1.017-1.016 0-.563-.455-1.019-1.017-1.019h-8.933l20.499-20.471v8.924c0 .563.452 1.018 1.018 1.018.561 0 1.016-.455 1.016-1.018v-11.379c0-.132-.025-.264-.076-.387-.107-.249-.304-.448-.554-.551z"></path>
                                                </svg>
                                            </span>
                                            <span className="property-info-entry">
                                                <span className="property-info-label">Superficie</span>
                                                <span className="property-info-value">{this.state.solicitudPresupuesto} <b className="property-info-unit">m²</b></span>
                                            </span>
                                        </div>

                                        <div className="col-xs-3 col-sm-3 col-md-3 p-b-15">
                                            <span className="property-info-icon icon-bed">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                                                    <path className="meta-icon" fill="#FFA500" d="M21 48.001h-19c-1.104 0-2-.896-2-2v-31c0-1.104.896-2 2-2h19c1.106 0 2 .896 2 2v31c0 1.104-.895 2-2 2zm0-37.001h-19c-1.104 0-2-.895-2-1.999v-7.001c0-1.104.896-2 2-2h19c1.106 0 2 .896 2 2v7.001c0 1.104-.895 1.999-2 1.999zm25 37.001h-19c-1.104 0-2-.896-2-2v-31c0-1.104.896-2 2-2h19c1.104 0 2 .896 2 2v31c0 1.104-.896 2-2 2zm0-37.001h-19c-1.104 0-2-.895-2-1.999v-7.001c0-1.104.896-2 2-2h19c1.104 0 2 .896 2 2v7.001c0 1.104-.896 1.999-2 1.999z"></path>
                                                </svg>
                                            </span>
                                            <span className="property-info-entry">
                                                <span className="property-info-label">Habitaciones</span>
                                                <span className="property-info-value">{this.state.solicitudHabitaciones}</span>
                                            </span>
                                        </div>

                                        <div className="col-xs-3 col-sm-3 col-md-3 p-b-15">
                                            <span className="property-info-icon icon-bath">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                                                    <path className="meta-icon" fill="#FFA500" d="M37.003 48.016h-4v-3.002h-18v3.002h-4.001v-3.699c-4.66-1.65-8.002-6.083-8.002-11.305v-4.003h-3v-3h48.006v3h-3.001v4.003c0 5.223-3.343 9.655-8.002 11.305v3.699zm-30.002-24.008h-4.001v-17.005s0-7.003 8.001-7.003h1.004c.236 0 7.995.061 7.995 8.003l5.001 4h-14l5-4-.001.01.001-.009s.938-4.001-3.999-4.001h-1s-4 0-4 3v17.005000000000003h-.001z"></path>
                                                </svg>
                                            </span>
                                            <span className="property-info-entry">
                                                <span className="property-info-label">Baños</span>
                                                <span className="property-info-value">{this.state.solicitudBanos}</span>
                                            </span>
                                        </div>

                                        <div className="col-xs-3 col-sm-3 col-md-3 p-b-15">
                                            <span className="property-info-icon icon-garage">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                                                    <path className="meta-icon" fill="#FFA500" d="M44 0h-40c-2.21 0-4 1.791-4 4v44h6v-40c0-1.106.895-2 2-2h31.999c1.106 0 2.001.895 2.001 2v40h6v-44c0-2.209-1.792-4-4-4zm-36 8.001h31.999v2.999h-31.999zm0 18h6v5.999h-2c-1.104 0-2 .896-2 2.001v6.001c0 1.103.896 1.998 2 1.998h2v2.001c0 1.104.896 2 2 2s2-.896 2-2v-2.001h11.999v2.001c0 1.104.896 2 2.001 2 1.104 0 2-.896 2-2v-2.001h2c1.104 0 2-.895 2-1.998v-6.001c0-1.105-.896-2.001-2-2.001h-2v-5.999h5.999v-3h-31.999v3zm8 12.999c-1.104 0-2-.895-2-1.999s.896-2 2-2 2 .896 2 2-.896 1.999-2 1.999zm10.5 2h-5c-.276 0-.5-.225-.5-.5 0-.273.224-.498.5-.498h5c.275 0 .5.225.5.498 0 .275-.225.5-.5.5zm1-2h-7c-.275 0-.5-.225-.5-.5s.226-.499.5-.499h7c.275 0 .5.224.5.499s-.225.5-.5.5zm-6.5-2.499c0-.276.224-.5.5-.5h5c.275 0 .5.224.5.5s-.225.5-.5.5h-5c-.277 0-.5-.224-.5-.5zm11 2.499c-1.104 0-2.001-.895-2.001-1.999s.896-2 2.001-2c1.104 0 2 .896 2 2s-.896 1.999-2 1.999zm0-12.999v5.999h-16v-5.999h16zm-24-13.001h31.999v3h-31.999zm0 5h31.999v3h-31.999z"></path>
                                                </svg>
                                            </span>
                                            <span className="property-info-entry">
                                                <span className="property-info-label">Cochera</span>
                                                <span className="property-info-value">{(this.state.solicitudCochera) ? ("Sí") : ("No")}</span>
                                            </span>
                                        </div>


                                    </div>


                                    <div className="section">
                                        <h4 className="s-property-title">Descripción</h4>
                                        <div className="s-property-content">
                                            <p>{this.state.solicitudDescripcion}</p>
                                        </div>
                                    </div>


                                    <div className="section additional-details">

                                        <h4 className="s-property-title">Detalles Adicionales</h4>

                                        <ul className="additional-details-list clearfix">
                                            <li>
                                                <span className="col-xs-6 col-sm-4 col-md-4 add-d-title">Distrito</span>
                                                <span className="col-xs-6 col-sm-8 col-md-8 add-d-entry">{this.state.solnomDistrito}</span>
                                            </li>

                                            <li>
                                                <span className="col-xs-6 col-sm-4 col-md-4 add-d-title">Provincia</span>
                                                <span className="col-xs-6 col-sm-8 col-md-8 add-d-entry">{this.state.solnomProvincia}</span>
                                            </li>
                                            <li>
                                                <span className="col-xs-6 col-sm-4 col-md-4 add-d-title">Departamento</span>
                                                <span className="col-xs-6 col-sm-8 col-md-8 add-d-entry">{this.state.solnomRegion}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {!cookies.get('correo')? 
                                        (
                                            <div style={{marginLeft: "50%"}}>

                                            </div>

                                        ) : (
                                            <div style={{marginTop: "5%",marginLeft: "43%"}}>
                                                <Link className="navbar-btn nav-button wow bounceInRight login" to={`/update-solicitud/${this.state.solid}/`} data-wow-delay="0.4s">Editar Solicitud</Link>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>



                        </div>

                    </div>
                </div>

            </div>

        );
    }
}

export default solicitudedit;