import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/services/educacion.service';
import { ExperiencialService } from 'src/app/services/experiencial.service';
import { PersonasService } from 'src/app/services/personas.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { SkillsService } from 'src/app/services/skills.service';
import { TipoEmpleoService } from 'src/app/services/tipoempleo.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {



  public personasList: any = [];
  public educacionList: any = [];
  public fines: any = [];
  public proyectosList: any = [];
  public finpro: any = [];
  public experiencialList: any=[];
  public estra: any=[];
  public tipoempleoList: any = [];
  public cate:any =[];
  public skillList: any= [];
  public nomskill: any = [];


  constructor(private skillservice: SkillsService, private tipoempleoservice: TipoEmpleoService, private experienciaService: ExperiencialService, private proyectosService: ProyectosService, private personasService: PersonasService, private educaacionService: EducacionService) { }

  ngOnInit(): void {

    this.personasService.listarPersonas().subscribe((data) => {
      console.log(data);
      this.personasList = data;
    }, (error) => { console.log("error") });

    this.tipoempleoservice.listarTipoEmpleo().subscribe((data) => {
      console.log(data);
      this.tipoempleoList = data;

      this.experienciaService.listarExperiencial().subscribe((data) => {
        console.log(data);
        this.experiencialList = data;
        for (let idd = 0; idd < this.experiencialList.length; idd++) {
          if (this.experiencialList[idd].esTrabajoActual === true) { this.estra[idd] = "SI" } else { this.estra[idd] = "NO" }
  
          var r=this.experiencialList[idd].tipoempleo;
          console.log("Despacito");
          console.log(r);
          for (let idx=0; idx <this.tipoempleoList.length;idx++) {
            console.log(this.tipoempleoList[idx].id);
            console.log(r);
  
            if (this.tipoempleoList[idx].id == (r-1).toString()) {this.cate[idd]=this.tipoempleoList[idx].tipoEmpleo}
          }
  
  
        }
      }, (error) => { console.log("error") });








    }, (error) => { console.log("error") });



    this.educaacionService.listarEducacion().subscribe((data) => {
      console.log(data);
      this.educacionList = data;
      for (let idd = 0; idd < this.educacionList.length; idd++) {
        if (this.educacionList[idd].finalizado === true) { this.fines[idd] = "SI" } else { this.fines[idd] = "NO" }
      }
    }, (error) => { console.log("error") });

    this.proyectosService.listarProyectos().subscribe((data) => {
      console.log(data);
      this.proyectosList = data;
      for (let idd = 0; idd < this.proyectosList.length; idd++) {
        if (this.proyectosList[idd].esProyectoActual === true) { this.finpro[idd] = "SI" } else { this.finpro[idd] = "NO" }
      }
    }, (error) => { console.log("error") });



    this.skillservice.listarSkills().subscribe((data) => {
      console.log(data);
      this.skillList = data;
      for (let idd = 0; idd < this.skillList.length; idd++) {
        if (this.skillList[idd].tipohs == '1') { this.nomskill[idd] = "HARD" } else { this.nomskill[idd] = "SOFT" }
      }
    }, (error) => { console.log("error") });

    






  }

  opp(a: number) {

    window.open(this.proyectosList[a].link, "_blank");


    console.log("linkkk " + a);

  }

}
