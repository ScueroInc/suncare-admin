import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-dialog-aceptar',
  templateUrl: './dialog-aceptar.component.html',
  styleUrls: ['./dialog-aceptar.component.css']
})
export class DialogAceptarComponent implements OnInit {

  isBotonAceptado: boolean;
  correoUsuario : string;
  asunto : string;
  mensaje: string;
  idDermatologo : string;
  estadoSolicitud : string;
  fechaActual  = new Date(); // obtener fecha actual
  fecha : string;

  constructor(@Inject(MAT_DIALOG_DATA) private data:{
    solicitudAceptada: boolean;
    correo: string;
    idDermatologo : string;
    estadoSolicitud : string;
  },
  private _solicitudService: SolicitudService,
  private dialogRef : MatDialogRef<DialogAceptarComponent>,
  private _snackbar :MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isBotonAceptado = this.data.solicitudAceptada;
    this.correoUsuario = this.data.correo;
    this.idDermatologo = this.data.idDermatologo;
    this.estadoSolicitud = this.data.estadoSolicitud;
  }
  async EnviarCorreo(isAceptado: boolean) {
    
    if(isAceptado){
      this.asunto = "Cuenta Activa";
      this.mensaje = `¡Felicidades!<br>
      Sus datos fueron comprobados, ya puede iniciar sesión en SunCare<br>
      Atentamente, Equipo de Gestión de accesos de SunCare.`;  
    }else {
      this.asunto = "Solicitud dermatólogo SunCare";
      this.mensaje = `Estimado,<br>
      Lamentamos informarle que los datos y fotos brindadas no fueron suficientes
      para verificar su identidad. Por favor, realice nuevamente la solicitud
      teniendo en cuenta las siguientes recomendaciones:<br>
      - Ingresar nombres completos y CMP exactamente como figura en el siguiente link: <a> https://www.cmp.org.pe/conoce-a-tu-medico/ </a><br>
      - Adjuntar una foto tamaño carnet en la que se aprecie claramente su rostro.<br>
      - Adjuntar una foto nítida del DNI.<br>
      Gracias.<br>
      Atentamente, Equipo de Gestión de accesos de SunCare.`;  
    }
    
    var dd = String(this.fechaActual.getDate()).padStart(2,'0');
    var mm = String(this.fechaActual.getMonth()+1).padStart(2,'0');
    var yy = this.fechaActual.getFullYear();
    this.fecha = yy+'-'+mm+'-'+dd;

    await this._solicitudService.updateSolicitudById(this.idDermatologo, this.estadoSolicitud, this.fecha);

    const response: boolean = await this._solicitudService.postEnviarCorreo(this.correoUsuario, this.asunto, this.mensaje).toPromise()
    .then((d:any) => d.enviado); 
    
    this.openSnackBar();
    
    if(response){
      this.dialogRef.close(true);
    } else{
      this.dialogRef.close(false);
    }    
  }
  openSnackBar() {
    this._snackbar.open("¡El correo fue enviado!","Cerrar", {
      duration: 3000,
    });
  }
  
}
