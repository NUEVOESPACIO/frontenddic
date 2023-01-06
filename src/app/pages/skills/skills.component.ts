import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SkillsService } from 'src/app/services/skills.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  

  

// Este el el form Array de todos los elementos ya cargados en BD para editar / Eliminar
form = this.fb.group({
  lessons: this.fb.array([])
});
public formularioEdicion= new FormGroup({});


// No se usa este Pattern. Solo lo mantengo de referencia
//public namePattern = /^.{3}\s[a-zA-Z]{3}\s\d{2}\s\d{4}.{1,}/;  
public namePattern =/^\d+$/

// Creo el formulario para generar el alta con sus FormControls

formularioAlta = new FormGroup({
nombreskill: new FormControl('', [Validators.required]),
tipohs: new FormControl('', [Validators.required]),
descripcion: new FormControl('', [Validators.required, Validators.maxLength(200)]),
valmax: new FormControl('',[Validators.required, Validators.pattern(this.namePattern)]), 
valor: new FormControl('',[Validators.required, Validators.pattern(this.namePattern)]), 
});

// Variable skill sobre la que alojare propiedades para enviar a la API
public skill ={     
nombreskill:'',
tipohs:'',
descripcion:'',
valmax:100,
valor:0,
persona:1,

};

// Variables educacionedit para inflarla con informacion del registro que quiere editar
public skilledit ={     
  id:0,
  nombreskill:'',
  tipohs:'',
  descripcion:'',
  valmax:100,
  valor:0,
  persona:1,
  };

// arrays de cada campo del registro para mostrar los datos de todos los registros que trae la API
public idz:any=[];
public id:any=[];
public nombreskill:any=[];
public tipohs:any=[];
public descripcion:any=[];
public valmax:any=[];
public valor:any=[];
public persona:any=[];

// Esta Lista se llenara con los datos de la API en el ENDPOINT listar
public skillList: any= [];   


// Varible publica con la que hago binding de cantidad de caracteres en el textarea
public sttt: string='';
public caracteresenedit: any=[];

// En el constructor inyecto el servicio que me permite vincularme con la API y la alterta MatanckBar, el ROuter y el FormBuilder
constructor(private skillsService: SkillsService, private snack:MatSnackBar, private fb: FormBuilder, private router: Router)  { 
}

// metodo get para lessons que es el form array
get lessons() {
return this.form.controls["lessons"] as FormArray;
}

// El metodo que iniciliza el compontente
ngOnInit(): void {

this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; };    
this.cargardata();   

} 

// Sube un elemento a la base de datos
formSubmit() {

if ((this.formularioAlta.valid))    

{console.log("Todos los datos son válidos");

// lleno variable educacion con lo datos de los formcontrols
this.skill.nombreskill=this.formularioAlta.get('nombreskill')?.value;
this.skill.tipohs=this.formularioAlta.get('tipohs')?.value;
this.skill.descripcion=this.formularioAlta.get('descripcion')?.value;
this.skill.persona=1;
this.skill.valmax=this.formularioAlta.get('valmax')?.value;  
this.skill.valor=this.formularioAlta.get('valor')?.value;  

// llamo al metodo del servicio para subir los datos a la base de datos
this.skillsService.anadirSkills(this.skill).subscribe(
 (data) => {
   console.log(data);
   Swal.fire('Skill / Habilidad guardada','Skill o Habilidad registrada con exito en el sistema','success');
   this.router.onSameUrlNavigation="reload";
   this.router.navigate(["/skills"]);        
 },(error)=> {
   console.log(error);
   this.snack.open("Ha ocurrido un error en el sistema", 'Aceptar', {
     duration: 3000 
   });   
 })} else {
   
   this.snack.open("Hay campos inválidos en el formulario. Favor, verificar", 'Aceptar', {
     duration: 3000 
   });   
 }     
}  

// llamo al metodo para traer datos del servidor API para exhibir de todos los registros.




public cargardata() {    
this.skillsService.listarSkills().subscribe((data)=>{console.log(data);
this.skillList=data;

// Recorro el Array, y voy agregando lessonForms a Lesssons;
for(let idd = 0 ; idd < this.skillList.length ; idd++){
 
 const lessonForm = this.fb.group({

     nombreskillg: [this.skillList[idd].nombreskill, [Validators.required]],
     tipohsg: [this.skillList[idd].tipohs, [Validators.required]],
     descripciong: [this.skillList[idd].descripcion, [Validators.required, Validators.maxLength(200)]],                    
     valmaxg: [this.skillList[idd].valmax, [Validators.required, Validators.pattern(this.namePattern)]],      
     valorg: [this.skillList[idd].valor, [Validators.required, Validators.pattern(this.namePattern)]],     

 });

 this.lessons.push(lessonForm); 
 //this.lessons.at(idd).get('tipohsg')?.setValue(this.skillList[idd].tipohs);
 //this.lessons.at(idd).get('tipohsg')?.updateValueAndValidity;
 
 
 var seb:string;
 
 if (this.skillList[idd].tipohs==='1') {seb='HARD';                  
 this.lessons.at(idd).get('tipohsg')?.setValue('1');      

 } else {seb='SOFT';     
 this.lessons.at(idd).get('tipohsg')?.setValue('2');       
 }      

  
}
 },(error)=>
 {console.log("error")});  
}

// funcione que carga el placeholder de dos de los campos del form edit, fecha ini y fechafin

public placehold(a:number,b:number): string {

  return "Me pareque que no se usa en esta entidad";
if (a===1) 
{return this.skillList[b].fechaini;} else 
{
 //if (this.lessons.at(b).get('fechafing')?.value.toString()==='') {return ''} else {return this.proyectosList[b].fechafin;}      
}
}

// llamo al metodo del servicio que me permite eliminar un registro
public eliminarskill(idx: number) {
var idu=this.skillList[idx].id;
console.log(idu);    
this.skillsService.eliminarSkills(idu).subscribe((data)=>{console.log(data)      
 Swal.fire('Habilidad/Skill correctamente eliminado','Habilidad/Skill eliminado ok','success');
 console.log("deberia estar todo eliminadion coorecdta");       
 this.router.onSameUrlNavigation="reload";
 this.router.navigate(["/skills"]);            

},(error)=>{console.log("No se pudo eliminar la Habilidad");
Swal.fire('No se pudo eliminar la Habilidad','No se pudo eliminar la habilidad','success');
});    
}

// Seteos cruzados de formscontrols cuando abro un cuadro de fecha de inicio.-


// Seteo cruzado (importante) cuando defino si se coloca Si o No a la finalizacion de estudios (pasan cosas)!


// Un simple conteo de caracteres del textarea
public contarcaracteres() {
this.sttt="Cantidad de caracters: "+ this.formularioAlta.get('descripcion')?.value?.length?.toString()+"/200";
//this.formularioAlta.get('tipoempleo')?.setValue('sebas2');  
}

// Conteo de caracteres para campo del edit
public contarcaracteresedit(idx: number) {
this.caracteresenedit[idx]="Cantidad de caracteres: "+this.lessons.at(idx).get('descripciong')?.value.toString().length +"/200";
}


// Un adicional de limpieza de formulario cuando cliqueo en reset. Adicional porque hay uno por defecto.-
public limpiar() {    
this.formularioAlta.get('tipohs')?.setValue('2');    
}

// Funcion que entra en accion cuando decido editar un regitro al hacer click en un boton.-  
public editarskill(idx:number) {

// la forma que encontre de que realice validaciones al editar entidad.-

if (
 typeof this.lessons.at(idx).get('nombreskillg')?.errors?.['required']==='undefined' && 
 typeof this.lessons.at(idx).get('tipohsg')?.errors?.['required']==='undefined' &&
 typeof this.lessons.at(idx).get('descripciong')?.errors?.['required']==='undefined' &&
 typeof this.lessons.at(idx).get('valmaxg')?.errors?.['required']==='undefined' &&
 typeof this.lessons.at(idx).get('valorg')?.errors?.['required']==='undefined' &&
 typeof this.lessons.at(idx).get('valorg')?.errors?.['pattern']==='undefined' &&
 typeof this.lessons.at(idx).get('valmaxg')?.errors?.['pattern']==='undefined' &&
 !this.lessons.at(idx).get('descripciong')?.errors?.['maxlength'] &&
 this.lessons.at(idx).get('tipohsg')?.value.toString()!=='')

 
{

var idu=this.skillList[idx].id;   
this.skilledit.id=idu;
this.skilledit.nombreskill=this.lessons.at(idx).get('nombreskillg')?.value;
this.skilledit.tipohs=this.lessons.at(idx).get('tipohsg')?.value;    
this.skilledit.descripcion=this.lessons.at(idx).get('descripciong')?.value;    
this.skilledit.valmax=this.lessons.at(idx).get('valmaxg')?.value;
this.skilledit.valor=this.lessons.at(idx).get('valorg')?.value;


// Llama al metodo del servicio necesario para actualizar
this.skillsService.editarSkills(this.skilledit).subscribe(
 (data) => {
   console.log(data);
   Swal.fire('Habilidad/Skill editado guardado','Habilidad / Skill editado registrado con exito en el sistema','success');

   this.router.onSameUrlNavigation="reload";
   this.router.navigate(["/skills"]);
  
 },(error)=> {
   console.log(error);
   this.snack.open("Ha ocurrido un error en el sistema al querer guardar una habilidad editado", 'Aceptar', {
     duration: 3000 
   });   
 })
} 
else {
this.snack.open("Favor, verificar posibles errores en los datos", 'Aceptar', {
duration: 3000 
});   
}  
}

  



}
