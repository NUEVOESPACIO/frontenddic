import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { UnoComponent } from './componente/uno/uno.component';
import { DosComponent } from './componente/dos/dos.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SkillsComponent } from './pages/skills/skills.component';
import { EducacionComponent } from './pages/educacion/educacion.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { PersonasComponent } from './pages/personas/personas.component';
import { TipoEmpleoComponent } from './pages/tipoempleo/tipoempleo.component';
import { ExperiencialComponent } from './pages/experiencial/experiencial.component';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { LoginComponent } from './pages/login/login.component';
import { interceptorProvider } from './services/interceptor-service';
import { PortadaInicialComponent } from './pages/portada-inicial/portada-inicial.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { Dashboard4Component } from './dashboard4/dashboard4.component';
import { Dashboard5Component } from './dashboard5/dashboard5.component';
import { TodoComponent } from './pages/todo/todo.component';







@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    UnoComponent,
    DosComponent,
    SkillsComponent,
    EducacionComponent,
    ProyectosComponent,
    PersonasComponent,
    TipoEmpleoComponent,
    ExperiencialComponent,
    Dashboard1Component,
    Dashboard2Component,
    LoginComponent,
    PortadaInicialComponent,
    Dashboard3Component,
    Dashboard4Component,
    Dashboard5Component,
    TodoComponent,

   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,   
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule, 
   
    
  ],
  providers: [
    interceptorProvider,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
