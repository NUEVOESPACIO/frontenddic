import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DosComponent } from './componente/dos/dos.component';
import { UnoComponent } from './componente/uno/uno.component';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path:'uno',
    component : UnoComponent,
    pathMatch:'full'
  },
  {
    path:'dos',
    component : DosComponent,
    pathMatch:'full'
  },
  {
    path:'navigation',
    component : NavigationComponent,
    pathMatch:'full'
  },
  {
    path:'',
    component : NavigationComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component : LoginComponent,
    pathMatch:'full',}, {

    path:'dashboard1',
    component : Dashboard1Component,
    pathMatch:'full'
  },
  

  

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
