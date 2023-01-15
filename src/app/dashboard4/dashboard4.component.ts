import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SkillsComponent } from '../pages/skills/skills.component';
import { SkillsService } from '../services/skills.service';

@Component({
  selector: 'app-dashboard4',
  templateUrl: './dashboard4.component.html',
  styleUrls: ['./dashboard4.component.scss']
})
export class Dashboard4Component implements OnInit {

  listag: any=[];

  

  altref=100;
  altur=this.altref.toString()+"px";
  altus=(this.altref-100).toString();
  //codelink:any= ["sobremi","educacion","experiencia","skills","proyectos","tipodeempleo"];

  varia=[SkillsComponent];
  cols=[3];
  


  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'ABM Tabla Skills', cols: 3, rows: 1 },
          
        ];
      }

      return [
        { title: 'ABM Tabla Skills', cols: 3, rows: 1 },        
      ];
    })
  );

  constructor(private conteo: SkillsService, private breakpointObserver: BreakpointObserver, private router: Router) {

  }

  ngOnInit() {
    console.log("ng onInit desde DashgBoradComponent.ts");    
    
    
  }

    


  


  expandirm(ca: number) {
    this.conteo.listarSkills().subscribe((data)=>{
      this.listag=data;
      var nn=this.listag.length;      
      this.altref=850*nn+30;
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
