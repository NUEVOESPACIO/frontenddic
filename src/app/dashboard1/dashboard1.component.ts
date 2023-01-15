import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UnoComponent } from '../componente/uno/uno.component';
import { DosComponent } from '../componente/dos/dos.component';
import { SkillsComponent } from '../pages/skills/skills.component';
import { TipoEmpleoComponent } from '../pages/tipoempleo/tipoempleo.component';
import { PersonasComponent } from '../pages/personas/personas.component';
import { EducacionComponent } from '../pages/educacion/educacion.component';
import { ExperiencialComponent } from '../pages/experiencial/experiencial.component';
import { ProyectosComponent } from '../pages/proyectos/proyectos.component';
import { Router } from '@angular/router';
import { TipoEmpleoService } from '../services/tipoempleo.service';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component {

  listag: any=[];


  altref=100;
  altur=this.altref.toString()+"px";
  altus=(this.altref-100).toString();
  //codelink:any= ["sobremi","educacion","experiencia","skills","proyectos","tipodeempleo"];

  varia=[TipoEmpleoComponent];
  cols=[3];
  


  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'ABM Tabla Tipos_de_Empleos', cols: 3, rows: 1 },
          
        ];
      }

      return [
        { title: 'ABM Tabla Tipos_de_Empleos', cols: 3, rows: 1 },        
      ];
    })
  );

  constructor(private conteo: TipoEmpleoService, private breakpointObserver: BreakpointObserver, private router: Router) {

  }

  ngOnInit() {
    console.log("ng onInit desde DashgBoradComponent.ts");    
    
    
  }

    


  



  expandirm(ca: number) {
    this.conteo.listarTipoEmpleo().subscribe((data)=>{
      this.listag=data;
      var nn=this.listag.length;      
      this.altref=353*nn+30;
      this.altur=this.altref.toString()+"px";
      this.altus=(this.altref-100).toString();
    }, (error)=>{
      this.altref=2000;
      this.altur=this.altref.toString()+"px";
      this.altus=(this.altref-100).toString();
    });

      
    
  };
  contraerm(ca: number) {
    this.altref=100;
    this.altur=this.altref.toString()+"px";
    this.altus=(this.altref-100).toString();  
    
    
    

  };



}
