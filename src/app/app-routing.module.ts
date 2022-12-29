import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EducacionComponent } from './pages/educacion/educacion.component';
import { TipoEmpleoComponent } from './pages/tipoempleo/tipoempleo.component';
import { ExperiencialComponent } from './pages/experiencial/experiencial.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';

const routes: Routes = [
  {
    path:'',
    component : HomeComponent,
    pathMatch:'full'
  },
  {
    path:'signup',
    component : SignupComponent,
    pathMatch:'full'
  },{
   path:'login',
   component : LoginComponent,
   pathMatch:'full'
  },{
    path:'educacion',
    component : EducacionComponent,
    pathMatch:'full',  
   },{
    path:'tipoempleo',
    component : TipoEmpleoComponent,
    pathMatch:'full',  
   },{
    path:'experiencial',
    component : ExperiencialComponent,
    pathMatch:'full',  
   },{
    path:'proyectos',
    component : ProyectosComponent,
    pathMatch:'full',  
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
