import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DosComponent } from './componente/dos/dos.component';
import { UnoComponent } from './componente/uno/uno.component';
import { NavigationComponent } from './navigation/navigation.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
