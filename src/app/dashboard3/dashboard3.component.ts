import { Component, OnInit } from '@angular/core';
import { EducacionComponent } from '../pages/educacion/educacion.component';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EducacionService } from '../services/educacion.service';

@Component({
  selector: 'app-dashboard3',
  templateUrl: './dashboard3.component.html',
  styleUrls: ['./dashboard3.component.scss']
})
export class Dashboard3Component implements OnInit {

  listag: any=[];


  altref=100;
  altur=this.altref.toString()+"px";
  altus=(this.altref-100).toString();
  //codelink:any= ["sobremi","educacion","experiencia","skills","proyectos","tipodeempleo"];

  varia=[EducacionComponent];
  cols=[3];
  


  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'ABM Tabla Educacion', cols: 3, rows: 1 },
          
        ];
      }

      return [
        { title: 'ABM Tabla Educacion', cols: 3, rows: 1 },        
      ];
    })
  );

  constructor(private conteo: EducacionService, private breakpointObserver: BreakpointObserver, private router: Router) {

  }

  ngOnInit() {
    console.log("ng onInit desde DashgBoradComponent.ts");    
    
    
  }

    


  



  expandirm(ca: number) {
    this.conteo.listarEducacion().subscribe((data)=>{
      this.listag=data;
      var nn=this.listag.length;      
      this.altref=1300*nn+30;
      this.altur=this.altref.toString()+"px";
      this.altus=(this.altref-100).toString();
    }, (error)=>{
      this.altref=2000;
      this.altur=this.altref.toString()+"px";
      this.altus=(this.altref-100).toString();
    });

  }
  contraerm(ca: number) {
    this.altref=100;
    this.altur=this.altref.toString()+"px";
    this.altus=(this.altref-100).toString(); 
    

  };



}
