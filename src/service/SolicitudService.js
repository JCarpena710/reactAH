import axios from "axios";

export class SolicitudService{
    baseUrl = "http://127.0.0.1:8050/api/solicitud/";
    getAll(){
        return axios.get(this.baseUrl).then(res => res.data);
    }

    save(solicitud) {
        return axios.post(this.baseUrl, solicitud).then(res => res.data.solicitudes);
    }
}