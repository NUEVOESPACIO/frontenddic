import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/services/educacion.service';
import { PersonasService } from 'src/app/services/personas.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public personasList: any= [];  
  public educacionList: any= [];  
  public fines: any= [];
  public proyectosList:any= [];
  public finpro:any= [];

  constructor(private proyectosService: ProyectosService, private personasService: PersonasService, private educaacionService: EducacionService) { }

  ngOnInit(): void {
      
    this.personasService.listarPersonas().subscribe((data)=>{console.log(data);
    this.personasList=data;},(error)=> {console.log("error")}); 


    this.educaacionService.listarEducacion().subscribe((data)=>{console.log(data);
      this.educacionList=data;    
      for(let idd = 0 ; idd < this.educacionList.length ; idd++) {
        if (this.educacionList[idd].finalizado===true) {this.fines[idd]="SI"} else {this.fines[idd]="NO"}
      } },(error)=> {console.log("error")}); 

      this.proyectosService.listarProyectos().subscribe((data)=>{console.log(data);
        this.proyectosList=data;    
        for(let idd = 0 ; idd < this.proyectosList.length ; idd++) {
          if (this.proyectosList[idd].esProyectoActual===true) {this.finpro[idd]="SI"} else {this.finpro[idd]="NO"}
        } },(error)=> {console.log("error")}); 



      }

  opp(a: number) {

    window.open(this.proyectosList[a].link, "_blank"); 
    

    console.log("linkkk " + a);

  }

}
