import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MaterialModule } from '../material/material.module';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudesPendientesComponent } from './components/solicitudes-pendientes/solicitudes-pendientes.component';
import { SolicitudesAceptadasComponent } from './components/solicitudes-aceptadas/solicitudes-aceptadas.component';
import { SolicitudesRechazadasComponent } from './components/solicitudes-rechazadas/solicitudes-rechazadas.component';
import { DialogAceptarComponent } from './components/dialog-aceptar/dialog-aceptar.component';
import { DialogImageComponent } from './components/dialog-image/dialog-image.component';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [SolicitudesPendientesComponent, SolicitudesAceptadasComponent, SolicitudesRechazadasComponent, DialogAceptarComponent, DialogImageComponent, FilterPipe],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    MaterialModule
  ]
})
export class SolicitudesModule { }
