import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
// Angular Material
import { MaterialModule } from '../material/material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SignInComponent } from './components/sign-in/sign-in.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ConnectionServiceModule } from'ng-connection-service';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
  declarations: [PageLayoutComponent, SignInComponent, SnackbarComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    ConnectionServiceModule
  ]
})
export class SharedModule { }
