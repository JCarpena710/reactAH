import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { District, Region, Province } from "ubigeos";
import departamentos from '../cosas/departamentos'
import provincias from '../cosas/provincias'
import distritos from '../cosas/distritos'

const baseUrl = "http://localhost:8050/api";

const cookies = new Cookies();

class usersolicitud extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            usuarioid: '',
            titulo: '',
            descripcion: '',
            tiposol: '',
            superficie: 60,
            habitaciones: 1,
            banos: 1,
            presupuesto: 550,
            cochera: false,
            estado: true,
            rid: '01',
            rnombre: '',
            pid: '0101',
            pnombre: '',
            did: '010101',
            dnombre: ''
        })

        this.cambioTitulo = this.cambioTitulo.bind(this);
        this.cambioDescripcion = this.cambioDescripcion.bind(this);
        this.cambioTipoSol = this.cambioTipoSol.bind(this);
        this.cambioSuperficie = this.cambioSuperficie.bind(this);
        this.cambioHabitaciones = this.cambioHabitaciones.bind(this);
        this.cambioBanos = this.cambioBanos.bind(this);
        this.cambioPresupuesto = this.cambioPresupuesto.bind(this);
        this.cambioCochera = this.cambioCochera.bind(this);
        this.save = this.save.bind(this);
    }

    cambioTitulo(e) {
        this.setState({
            titulo: e.target.value
        });
    }

    cambioDescripcion(e) {
        this.setState({
            descripcion: e.target.value
        });
    }

    cambioTipoSol(e) {
        this.setState({
            tiposol: e.target.value
        });
    }

    cambioSuperficie(e) {
        this.setState({
            superficie: e.target.value
        });
    }



    cambioHabitaciones(e) {
        this.setState({
            habitaciones: e.target.value
        });
    }

    cambioBanos(e) {
        this.setState({
            banos: e.target.value
        });
    }

    cambioPresupuesto(e) {
        this.setState({
            presupuesto: e.target.value
        });
    }

    cambioCochera(e) {
        this.setState({
            cochera: e.target.value
        });
    }

    handleChange = event => {
        /* Esto te devuelve el valor de la region junto con su nombre */
        this.setState({ rid: event.target.value });
        let a = Region.instance(`${event.target.value}`).getName();
        this.setState({ rnombre: JSON.stringify(a) });
    };

    handleChange2 = event => {
        /* Esto te devuelve el valor de la provincia y una variable que contiene su nombre */
        this.setState({ pid: event.target.value });
        let a = Province.instance(`${event.target.value}`).getName();
        this.setState({ pnombre: JSON.stringify(a) });
    };

    handleChange3 = event => {
        /* Esto te devuelve el distrito junto con su nombre */
        this.setState({ did: event.target.value });
        let a = District.instance(`${event.target.value}`).getName();
        this.setState({ dnombre: JSON.stringify(a) });
    };

    save(e) {
        e.preventDefault();
        let id = cookies.get('id');
        /*  alert(id);
        alert(`titulo: ${this.state.titulo} \n
               presupuesto: ${this.state.presupuesto} \n
               description: ${this.state.descripcion} \n
               tipo solicitud: ${this.state.tiposol} \n
               area: ${this.state.superficie} \n
               habitaciones: ${this.state.habitaciones} \n
               baños : ${this.state.banos} \n
               cochera: ${this.state.cochera}`);
        alert(`ID de region/departamento ${this.state.rid} nombre de la region/departamento ${this.state.rnombre}`);
        alert(`ID de la provincia ${this.state.pid} nombre de la provincia ${this.state.pnombre}`);
        alert(`ID del distrito ${this.state.did} nombre del distrito ${this.state.dnombre}`) 
        */
        let solici= {
            usuarioid:id,
            titulo:this.state.titulo,
            descripcion:this.state.descripcion,
            tiposol:this.state.tiposol,
            provincia:this.state.pid,
            departamento:this.state.rid,
            distrito:this.state.did,
            superficie:this.state.superficie,
            habitaciones:this.state.habitaciones,
            banos:this.state.banos,
            presupuesto:this.state.presupuesto,
            cochera:this.state.cochera,
            estado:this.state.estado,
        }
        try{
        axios.post(`${baseUrl}/solicitud/`, solici)
        }catch (e){
            alert(`Error: ${e}`);
        }
        window.location.href ="/solicitud";
    }

    render() {
        return (
            <div>
                <div className="page-head">
                    <div className="container">
                        <div className="row">
                            <div className="page-head-content">
                                <h1 className="page-title">Solicitudes</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-area submit-property" style={{ backgroundColor: '#FCFCFC' }}>&nbsp;
                    <div className="container">
                        <div className="clearfix" >
                            <div className="wizard-container">

                                <div className="wizard-card ct-wizard-orange" id="wizardProperty">



                                    <form id="solicitud-form" onSubmit={this.save}>


                                        <div className="wizard-header">
                                            <h3>
                                                <b>Realizar una solicitud</b> <br />
                                                <br />
                                            </h3>
                                        </div>

                                        <ul>
                                            <li><a href="#step1" data-toggle="tab">Step 1 </a></li>
                                            <li><a href="#step2" data-toggle="tab">Step 2 </a></li>
                                            <li><a href="#step4" data-toggle="tab">Finished </a></li>
                                        </ul>

                                        <div className="tab-content">

                                            <div className="tab-pane" id="step1">
                                                <div className="row p-b-15 ">
                                                    <div className="col-sm-12" style={{ padding: "50px" }}>

                                                        <div className="form-group">
                                                            <label>Titulo de tu solicitud:</label>
                                                            <input name="titulo" type="text" className="form-control" value={this.state.titulo} onChange={this.cambioTitulo} ></input>
                                                        </div>

                                                        <div className="form-group">
                                                            {/* Este select lee todos los valores de departamentos una sola vez
                                                            como es un mapa, los valores son dinámicos */}
                                                            <label>Departamento<small>(required)</small></label>
                                                            <select value={this.state.value} key={this.state.key} onChange={this.handleChange}  className="form-control">
                                                                <option defaultValue >
                                                                    Elige un departamento
                                                                </option>
                                                                {departamentos.map((i, key) => (
                                                                    <option key={i.id} value={i.id}>
                                                                        {i.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            {/* Esto devuelve el valor de la provincia, para que cada provincia se ajuste a su región
                                                            tiene un condicional, sólo devuelve las opciones de las provincias cuyo department_id
                                                            sea igual al del departamento elegido */}
                                                            <label>Provincia <small>(required)</small></label>
                                                            <select value={this.state.value} key={this.state.key} onChange={this.handleChange2}  className="form-control">
                                                                <option defaultValue>
                                                                    Elige una provincia
                                                                </option>
                                                                {
                                                                    provincias.map((pi, key) =>
                                                                        (pi.department_id === this.state.rid) ? (/* <--this.state.rid es el ID de la region */
                                                                            <option key={pi.id} value={pi.id} >
                                                                                {pi.name}
                                                                            </option>)
                                                                            : (<></>)
                                                                    )
                                                                }
                                                            </select>
                                                        </div>

                                                        <div className="form-group">
                                                            {/* Para distrito es un poco más complicado, primero evalua el ID del departamento*
                                                             y  luego evalua el ID de la provincia */}
                                                            <label>Distrito <small>(required)</small></label>
                                                            <select value={this.state.value} key={this.state.key} onChange={this.handleChange3}  className="form-control">
                                                                <option defaultValue>
                                                                    Elige un distrito
                                                                </option>
                                                                {
                                                                    distritos.map((di, key) =>
                                                                        (di.department_id === this.state.rid) ? (/*<--ID de region */
                                                                            (di.province_id === this.state.pid) ? (/* <--ID de provincia */
                                                                                <option key={di.id} value={di.id} >
                                                                                    {di.name}
                                                                                </option>)
                                                                                : (<></>)
                                                                        ) : (<></>))
                                                                }
                                                            </select>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Presupuesto <small></small> </label>
                                                            <input name="presupuesto" type="number" className="form-control" min="550" max="5000" value={this.state.presupuesto} onChange={this.cambioPresupuesto} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="tab-pane" id="step2">
                                                <div className="row" style={{ padding: "50px" }} >
                                                    <div className="col-sm-12" >
                                                        <div className="col-sm-12">
                                                            <div className="form-group">
                                                                <label>Descripción de la solicitud :</label>
                                                                <textarea name="descripcion" className="form-control" value={this.state.descripcion} onChange={this.cambioDescripcion} ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label>Tipo de solicitud  :</label>
                                                                <input name="tipo" type="text" className="form-control" value={this.state.tiposol} onChange={this.cambioTipoSol} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label>Superficie :</label>
                                                                <input name="superficie" type="number" className="form-control" min="60" max="130" value={this.state.superficie} onChange={this.cambioSuperficie} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label>Habitaciones :</label>
                                                                <input name="habitaciones" type="number" className="form-control" min="1" max="5" value={this.state.habitaciones} onChange={this.cambioHabitaciones} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label>Baños  :</label>
                                                                <input name="banos" type="number" className="form-control" min="1" max="3" value={this.state.banos} onChange={this.cambioBanos} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label>Cochera  :</label>&nbsp;&nbsp;&nbsp;
                                                                <input name="cochera" type="checkbox" className="form-control" checked={this.state.cochera} onChange={this.cambioCochera} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <br />
                                                </div>
                                            </div>

                                            <div className="tab-pane" id="step4">
                                                <h4 className="info-text"> Finished and submit </h4>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="">
                                                            <p>
                                                                <label><strong>Terms and Conditions</strong></label>&nbsp;
                                                                By accessing or using  GARO ESTATE services, such as
                                                                posting your property advertisement with your personal
                                                                information on our website you agree to the
                                                                collection, use and disclosure of your personal information
                                                                in the legal proper manner
                                                            </p>

                                                            <div className="checkbox">
                                                                <label>
                                                                    <input type="checkbox" /> <strong>Accept termes and conditions.</strong>
                                                                </label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="wizard-footer">
                                            <div className="pull-right">
                                                <input type='button' className='btn btn-next btn-primary' name='next' value='Next' />
                                                <input type='submit' className='btn btn-finish btn-primary ' name='finish' value='Listo' />
                                            </div>

                                            <div className="pull-left">
                                                <input type='button' className='btn btn-previous btn-default' name='previous' value='Previous' />
                                            </div>
                                            <div className="clearfix"></div>
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

export default usersolicitud;