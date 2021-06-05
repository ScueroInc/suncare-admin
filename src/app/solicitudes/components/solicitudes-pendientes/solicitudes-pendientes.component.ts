import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudService } from '../../services/solicitud.service';
import { DialogAceptarComponent } from '../dialog-aceptar/dialog-aceptar.component';
import { DialogImageComponent } from '../dialog-image/dialog-image.component';
import { Dermatologo } from '../../models/dermatologo';
@Component({
  selector: 'app-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.component.html',
  styleUrls: ['./solicitudes-pendientes.component.css']
})
export class SolicitudesPendientesComponent implements OnInit {
  isLoading = true;
  meses = [
    {id: 0, name: "Todos"},
    {id: 1, name: "Enero"},
    {id: 2, name: "Febrero"},
    {id: 3, name: "Marzo"},
    {id: 4, name: "Abril"},
    {id: 5, name: "Mayo"},
    {id: 6, name: "Junio"},
    {id: 7, name: "Julio"},
    {id: 8, name: "Agosto"},
    {id: 9, name: "Septiembre"},
    {id: 10, name: "Octubre"},
    {id: 11, name: "Noviembre"},
    {id: 12, name: "Diciembre"},
  ];

  dermatologos: Dermatologo[] = [];
  globalDerm : Dermatologo[] = [];
  filterSearch = '';
  estadoSolicitud: string;
  datosValidados:any[] = [];

  constructor(private _solicitudService: SolicitudService, private  dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.getSolicitudes();
  }
 
  async getSolicitudes() {
    const response =  await this._solicitudService.getDermatologosConSolicitudesByEstado('pendiente');
    this.dermatologos = response;

    //  this.dermatologos.sort(function(a, b){                     //!
    //  let dateA = new Date(a.solicitudes.fechaSolicitud);        //!
     // let dateB = new Date(b.solicitudes.fechaSolicitud);        //! 
    //  return  dateB >dateA ? 1 : dateB < dateA ? -1 : 0;         //!
    //                                                             //!
    //});                                                          //!


    this.globalDerm = this.dermatologos;
    this.isLoading = false; 
    
   // console.log(this.dermatologos[0].solicitudes?.fechaSolicitud);
  }

  ejecutarDialog(isAcepted: boolean, correo: string, actualId:string){
    this.estadoSolicitud = isAcepted ? "aceptada" : "rechazada";

    const dialogRef = this.dialog.open(DialogAceptarComponent,{
      width: '600px',
      data:{
        solicitudAceptada: isAcepted,
        correo: correo,
        idDermatologo: actualId,
        estadoSolicitud: this.estadoSolicitud
      }
    });
    dialogRef.afterClosed().subscribe( (d: boolean) =>{
      if (d) {
        this.getSolicitudes();
      }
    });
  }

  ejecutarDialogImage(imagenProfile: string, imagenDni : string) {
    this.dialog.open(DialogImageComponent,{
      width: '600px',
      data:{
        imagenProfile: imagenProfile,
        imagenDni: imagenDni
      }
    });
  }

  filtrar( mesid: number) {
    this.dermatologos = this.globalDerm;
    if(mesid != 0) {
    this.dermatologos =  this.dermatologos.filter( d => new Date(d.solicitudes?.fechaSolicitud).getMonth() + 1  == mesid);
    }
  }

  validarCMP(respuesta: boolean, nombre: string) {
    if(respuesta)
      return false;
    else if ( respuesta== false && nombre == '')
          return true;
          
    

  }
}
