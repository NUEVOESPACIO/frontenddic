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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  altref=100;
  altur=this.altref.toString()+"px";
  altus=(this.altref-100).toString();
  //codelink:any= ["sobremi","educacion"];

  varia=[PersonasComponent];
  cols=[3];



  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'ABM Sobre mi', cols: 3, rows: 1 },          
        ];
      }

      return [
        { title: 'ABM Sobre mi', cols: 3, rows: 1 },
        
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {

  }

  ngOnInit() {
    console.log("ng onInit desde DashgBoradComponent.ts");    
    
    
  }

  ngOnChanges() {
    console.log("ng on chnages");
    console.log(this.altref);
   

  }

  ngDoCheck() {
    console.log("ng Do check");
    console.log(this.altref);
    ;        
    


  }


  expandirm(ca: number) {
    this.altref=1400;
    this.altur=this.altref.toString()+"px";
    this.altus=(this.altref-100).toString();        
  };
  contraerm(ca: number) {
    this.altref=100;
    this.altur=this.altref.toString()+"px";
    this.altus=(this.altref-100).toString(); 
    
   

  };

}
