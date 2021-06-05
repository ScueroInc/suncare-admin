import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http'
import { Dermatologo } from '../models/dermatologo';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private urlCorreo =  'https://suncare-api.herokuapp.com/api/enviarcorreo/correo/';
  private urlValidar = 'https://suncare-api.herokuapp.com/api/validar';

  constructor(private store: AngularFirestore, private http: HttpClient) { }
  
  getConfirmarIdentidad(codigo:string, nombre:string, apellido:string){ 
    let data = {nombres:nombre, apellidos:apellido, cmp:codigo};
    return this.http.post(this.urlValidar, data);
  }

  async getDermatologosConSolicitudesByEstado(estado: string) {  //! .......
    const dermatologosRef = this.store.collection('dermatologos');       
    let response: Dermatologo[] = [];

    let dermatologos = await dermatologosRef.ref.where('solicitudes.estadoSolicitud', '==', estado).orderBy('order','desc').get(); //? . .orderBy('fechaHoy','desc') order
    dermatologos.forEach((res:any) => {                                             //? index solicitudes.estadoSolicitud n'  fechaHoy
      let dermatologoScope: Dermatologo = res.data();
      response.push(dermatologoScope);
    })
    return response;
  }


  async updateSolicitudById(idDermatologo : string, estadoSolicitud:string, fecha: string){  

    var otro = new Date();
    

    await this.store.collection('dermatologos').doc(idDermatologo).update({
      'solicitudes.estadoSolicitud': estadoSolicitud,
      'solicitudes.fechaProcesada': fecha,
      'order': otro.getTime(),
    } 
    );
  }

  async getcpmAllPaceintes() {
    let response: Dermatologo[] = [];
    const paceintesref = this.store.collection('dermatologos');
    let pacientes =  await paceintesref.ref.where('codigo','==' , '111112').get();
    pacientes.forEach((res:any) => {   
      let dermatologoScope: Dermatologo = res.data();   
      response.push(dermatologoScope);
    })
    console.log(response);
  }

  postEnviarCorreo( correo: string, asunto: string, mensaje: string){
    let data = {
      correo: correo,
      asunto: asunto,
      mensaje: mensaje
    }
    return this.http.post(this.urlCorreo, data);
  }
}

