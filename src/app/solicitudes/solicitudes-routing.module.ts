import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { SolicitudesAceptadasComponent } from './components/solicitudes-aceptadas/solicitudes-aceptadas.component';
import { SolicitudesPendientesComponent } from './components/solicitudes-pendientes/solicitudes-pendientes.component';
import { SolicitudesRechazadasComponent } from './components/solicitudes-rechazadas/solicitudes-rechazadas.component';


const routes: Routes = [
  { path: 'pendientes', component: SolicitudesPendientesComponent , canActivate:[AuthGuard]},
  { path: 'aceptadas', component: SolicitudesAceptadasComponent, canActivate:[AuthGuard] },
  { path: 'rechazadas', component: SolicitudesRechazadasComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
