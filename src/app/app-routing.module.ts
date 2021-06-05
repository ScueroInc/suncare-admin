import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLayoutComponent } from './shared/components/page-layout/page-layout.component';
import { SignInComponent } from './shared/components/sign-in/sign-in.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  { path: '', component: SignInComponent},
  { path: 'solicitudes', component: PageLayoutComponent, canActivate: [AuthGuard],children: [
    {path: '', loadChildren: () => import('./solicitudes/solicitudes.module').then(m => m.SolicitudesModule)}
    ]
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
