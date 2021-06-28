import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { District, Region, Province } from "ubigeos";
import departamentos from '../cosas/departamentos';
import provincias from '../cosas/provincias';
import distritos from '../cosas/distritos';

const baseUrl = "http://127.0.0.1:8050/api";
const cookies = new Cookies();

class updatesolicitud extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            id: '',
            cochera: false,
            usuarioid: '',
            titulo: '',
            descripcion: '',
            departamentoId: '',
            departamentoNombre: '',
            provinciaId: '',
            provinciaNombre: '',
            distritoId: '',
            distritoNombre: '',
            estado: '',
            presupuesto: '',
            tiposol: '',
            habitaciones: '',
            banos: '',
            superficie: ''

        })

        this.cambioTitulo = this.cambioTitulo.bind(this);
        this.cambioDescripcion = this.cambioDescripcion.bind(this);
        this.cambioEstado = this.cambioEstado.bind(this);
        this.cambioPresupuesto = this.cambioPresupuesto.bind(this);
        this.cambioTiposol = this.cambioTiposol.bind(this);
        this.cambioHabitaciones = this.cambioHabitaciones.bind(this);
        this.cambioCochera = this.cambioCochera.bind(this);
        this.cambioBanos = this.cambioBanos.bind(this);
        this.cambioSuperficie = this.cambioSuperficie.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.save = this.save.bind(this);

    }

    componentDidMount() {
        if (!cookies.get('correo')) {
            window.location.href = "./";
        }
        try {
            const { match } = this.props;
            const solId = match.params.solicitudID
            axios.get(baseUrl + `/solicitud/${solId}/`).then
                (res => {
                    let a = Region.instance(`${res.data.departamento}`).getName();
                    let b = Province.instance(`${res.data.provincia}`).getName();
                    let c = District.instance(`${res.data.distrito}`).getName();
                    this.setState({
                        id: res.data.id,
                        usuarioid: res.data.usuarioid,
                        titulo: res.data.titulo,
                        descripcion: res.data.descripcion,
                        departamentoId: res.data.departamento,
                        provinciaId: res.data.provincia,
                        distritoId: res.data.distrito,
                        estado: res.data.estado,
                        presupuesto: res.data.presupuesto,
                        tiposol: res.data.tiposol,
                        habitaciones: res.data.habitaciones,
                        cochera: res.data.cochera,
                        banos: res.data.banos,
                        superficie: res.data.superficie,
                        departamentoNombre:JSON.stringify(a),
                        provinciaNombre:JSON.stringify(b),
                        distritoNombre:JSON.stringify(c)

                    })
                })
        }
        catch (err) {
            alert(`Error: ${err}`)
            window.location.href = "/solicitud";
        }
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


    cambioEstado(e) {
        this.setState({
            estado: e.target.value
        });
    }

    cambioPresupuesto(e) {
        this.setState({
            presupuesto: e.target.value
        });
    }

    cambioTiposol(e) {
        this.setState({
            tiposol: e.target.value
        });
    }

    cambioHabitaciones(e) {
        this.setState({
            habitaciones: e.target.value
        });
    }

    cambioCochera(e) {
        this.setState({
            cochera: e.target.checked
        })
    }

    cambioBanos(e) {
        this.setState({
            banos: e.target.value
        });
    }

    cambioSuperficie(e) {
        this.setState({
            superficie: e.target.value
        });
    }

    handleChange = event => {
        this.setState({ departamentoId: event.target.value });
        let a = Region.instance(`${event.target.value}`).getName();
        this.setState({ departamentoNombre: JSON.stringify(a) });
    };

    handleChange2 = event => {
        this.setState({ provinciaId: event.target.value });
        let a = Province.instance(`${event.target.value}`).getName();
        this.setState({ provinciaNombre: JSON.stringify(a) });
    };

    handleChange3 = event => {
        this.setState({ distritoId: event.target.value });
        let a = District.instance(`${event.target.value}`).getName();
        this.setState({ distritoNombre: JSON.stringify(a) });
    };



    save(e) {
        let info = {
            titulo: this.state.titulo,
            usuarioid: this.state.usuarioid,
            descripcion: this.state.descripcion,
            departamento: this.state.departamentoId,
            provincia: this.state.provinciaId,
            distrito: this.state.distritoId,
            habitaciones: this.state.habitaciones,
            presupuesto: this.state.presupuesto,
            cochera: this.state.cochera,
            estado: this.state.estado,
            tiposol: this.state.tiposol,
            banos: this.state.banos,
            superficie: this.state.superficie
        };
        axios.put(`http://localhost:8050/api/solicitud/${this.state.id}/`, info).then(
            this.props.history.push('/mis-solicitudes')
        )
        .catch((e) => {
            alert(`Error: ${e}`)
        });

        window.location.href="/mis-solicitudes";
    }

    render() {
        return (

            <div>
                <div className="page-head">
                    <div className="container">
                        <div className="row">
                            <div className="page-head-content">
                                <h1 className="page-title">Editar los detalles de la <span className="orange strong">solicitud</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-area user-profiel" style={{ backgroundColor: '#FCFCFC' }}>&nbsp;
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2 col-sm-offset-1 col-lg-11 profiel-container">

                                <form onSubmit={this.save} >
                                    <div className="profiel-header">
                                        <h3 style={{ marginLeft: "-10%" }}>
                                            <b>Solicitud</b><br />
                                            <small>Detalles</small>
                                        </h3>
                                        <hr />
                                    </div>
                                    <div className="clear">
                                        <div className="col-sm-12 padding-top-0"  >
                                            <div className="form-group">
                                                <label>Título de la Solicitud</label>
                                                <input type="text" className="form-control" value={this.state.titulo} onChange={this.cambioTitulo}  ></input>
                                            </div>
                                            <div className="form-group">
                                                <label>Descripción</label>
                                                <textarea rows="11" className="form-control" value={this.state.descripcion} onChange={this.cambioDescripcion}  ></textarea>
                                            </div>
                                        </div>


                                        <div className="col-sm-6 padding-top-2">
                                            <div className="form-group">
                                                <label>Departamento</label>
                                                <select value={this.state.value} key={this.state.key} onChange={this.handleChange} className="form-control">
                                                    <option defaultValue={this.state.departamentoId}>
                                                    {this.state.departamentoNombre.split(`"`)}
                                                    </option>
                                                    {departamentos.map((i, key) => (
                                                        <option key={i.id} value={i.id}>
                                                            {i.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 padding-top-2">
                                            <div className="form-group">
                                                <label>Provincia</label>
                                                <select value={this.state.provinciaId} key={this.state.key} onChange={this.handleChange2} className="form-control">
                                                    {
                                                        provincias.map((pi, key) =>
                                                            (pi.department_id === this.state.departamentoId) ? (
                                                                <option key={pi.id} value={pi.id} >
                                                                    {pi.name}
                                                                </option>)
                                                                : (<></>)
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 padding-top-2">
                                            <div className="form-group">
                                                <label>Distrito</label>
                                                
                                                <select value={this.state.distritoId} key={this.state.key} onChange={this.handleChange3} className="form-control">
                                                      
                                                    {
                                                        distritos.map((di, key) =>
                                                            (di.department_id === this.state.departamentoId) ? (
                                                                (di.province_id === this.state.provinciaId) ? (
                                                                    <option key={di.id} value={di.id} >
                                                                        {di.name}
                                                                    </option>)
                                                                    : (< >
                                                                        
                                                                      </>)
                                                            ) : (<>
                                                                
                                                              </>))
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 padding-top-2">
                                            <div className="form-group">
                                                <label>Presupuesto</label>
                                                <input name="presupuesto" type="number" className="form-control" value={this.state.presupuesto} onChange={this.cambioPresupuesto} ></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 padding-top-2">
                                            <div className="form-group">
                                                <label>Superficie</label>
                                                <input name="superficie"type="number" className="form-control" value={this.state.superficie} onChange={this.cambioSuperficie} ></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 padding-top-2">
                                            <div className="form-group">
                                                <label>Habitaciones</label>
                                                <input name="habitaciones" type="number" className="form-control" value={this.state.habitaciones} onChange={this.cambioHabitaciones} ></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 padding-top-2">
                                            <div className="form-group">
                                                <label>Baños</label>
                                                <input name="banos"  type="number" className="form-control" value={this.state.banos} onChange={this.cambioBanos} ></input>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 padding-top-2">
                                            <div className="form-group">
                                                <label>Cochera  :</label>
                                                <input
                                                    name="cochera"
                                                    type="checkbox"
                                                    className="form-control"
                                                    checked={!!this.state.cochera}
                                                    onChange={this.cambioCochera} />
                                            </div>
                                        </div>
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

export default updatesolicitud;