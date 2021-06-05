import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dermatologo } from '../../models/dermatologo';
import { SolicitudService } from '../../services/solicitud.service';
import { DialogImageComponent } from '../dialog-image/dialog-image.component';

@Component({
  selector: 'app-solicitudes-rechazadas',
  templateUrl: './solicitudes-rechazadas.component.html',
  styleUrls: ['./solicitudes-rechazadas.component.css']
})
export class SolicitudesRechazadasComponent implements OnInit {
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
  constructor(private _solicitudService: SolicitudService, private  dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSolicitudes();
  }
  async getSolicitudes() {    
    const response = await this._solicitudService.getDermatologosConSolicitudesByEstado('rechazada');
    this.dermatologos = response;
    //this.dermatologos.sort(function(a, b){
    //  let dateA = new Date(a.solicitudes.fechaSolicitud);
    //  let dateB = new Date(b.solicitudes.fechaSolicitud);
    // 
    //  return  dateA > dateB ? 1 : dateA < dateB ? -1 : 0
    //});
    this.globalDerm = this.dermatologos;
    this.isLoading = false;
  }

  
  filtrar( mesid: number) {
    this.dermatologos = this.globalDerm;
    if(mesid != 0) {
    this.dermatologos =  this.dermatologos.filter( d => new Date(d.solicitudes?.fechaSolicitud).getMonth() + 1  == mesid);
    }
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
}
