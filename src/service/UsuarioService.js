import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export class UsuarioService{
    baseUrl = "http://127.0.0.1:8050/api/usuarios/";
    getAll(){
        return axios.get(this.baseUrl).then(res => res.data);
    }

    save(usuario) {
        return axios.post(this.baseUrl, usuario).then(res => res.data);
    }
    userAll(){
        return axios.get(`${this.baseUrl}/${cookies.get('id')}/`).then(res =>res.data.solicitudes);
    }
}