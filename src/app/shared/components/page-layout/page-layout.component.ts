import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css']
})
export class PageLayoutComponent implements OnInit {
  isConnected = true;

  mensaje: string;

  icon:string;

  color: string;

  hasNetworkConnection: boolean;
  hasInternetAccess: boolean;
  status: string;
 
  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe(currentState => {
      this.hasNetworkConnection = currentState.hasNetworkConnection;
      this.hasInternetAccess = currentState.hasInternetAccess;
      if (this.hasNetworkConnection && this.hasInternetAccess) {
        this.status = 'ONLINE';
      } else {
        this.status = 'OFFLINE';
      }
    });
  }
}
  ngOnInit(): void {
  }

  async logout(){
    try{
      this.authSerivice.logout();
      this.router.navigate(['/']);
    } catch(error){
      console.log(error);

    }
  }

  verificarConexionInternet() {
    this.conexionService.monitor().subscribe( isConnected => {
      this.isConnected = isConnected;
      if( this.isConnected) {
        this.mensaje = "Se restauró la conexión a internet";
        this.icon = "wifi";
        this.color = "green";
        this.openSnackInternet(this.icon, this.mensaje, this.color);
      } else {
        this.mensaje = "Error de conexión a Internet";
        this.icon = "wifi_off";
        this.color = "white";
        this.openSnackNoInternet(this.icon, this.mensaje, this.color);
      }
    })
  }

  openSnackNoInternet(icon: string, mensaje: string, color: string) {
    this._snackbar.openFromComponent(SnackbarComponent, {
      horizontalPosition: 'start',
      duration: 4000,
      data : {
        icon: icon,
        mensaje: mensaje,
        color: color
      }
    })
  }

  openSnackInternet(icon: string, mensaje: string, color: string) {
    this._snackbar.openFromComponent(SnackbarComponent, {
      horizontalPosition: 'start',
      duration: 4000,
      data : {
        icon: icon,
        mensaje: mensaje,
        color: color
      }
    })
  }

}
