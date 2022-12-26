import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExperiencialService } from 'src/app/services/experiencial.service';
import { TipoEmpleoService } from 'src/app/services/tipoempleo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencial',
  templateUrl: './experiencial.component.html',
  styleUrls: ['./experiencial.component.css']
})
export class ExperiencialComponent implements OnInit {

  

// Este el el form Array de todos los elementos ya cargados en BD para editar / Eliminar
form = this.fb.group({
  lessons: this.fb.array([])
});
public formularioEdicion= new FormGroup({});


// No se usa este Pattern. Solo lo mantengo de referencia
public namePattern = /^.{3}\s[a-zA-Z]{3}\s\d{2}\s\d{4}.{1,}/;  

// Creo el formulario para generar el alta con sus FormControls

formularioAlta = new FormGroup({
nombreEmpresa: new FormControl('', [Validators.required]),
fechaini: new FormControl('',[Validators.required]), 
esTrabajoActual: new FormControl({value: '', disabled: true},[Validators.required]), 
fechafin: new FormControl({value: '', disabled: true}), 
descripcion: new FormControl('', [Validators.required, Validators.maxLength(200)]),
tipoempleo: new FormControl('', [Validators.required])
});

// Variable educacion sobre la que alojare propiedades para enviar a la API
public experiencial ={     
nombreEmpresa:'',
fechaini:'',
esTrabajoActual:false,
fechafin:'',
descripcion:'',
personaid:0,
tipoempleo:''
};

// Variables educacionedit para inflarla con informacion del registro que quiere editar
public experiencialedit ={     
  id:0,
  nombreEmpresa:'',
  fechaini:'',
  esTrabajoActual:false,
  fechafin:'',
  descripcion:'',
  personaid:'',
  tipoempleo:''
  };

// arrays de cada campo del registro para mostrar los datos de todos los registros que trae la API
public idz:any=[];
public id:any=[];
public nombreEmpresa:any=[];
public esTrabajAactual:any=[];
public fechaini:any=[];
public fechafin:any=[];
public descripcion:any=[];
public personaid:any=[];
public tipoempleo:any=[];

// Esta Lista se llenara con los datos de la API en el ENDPOINT listar
public experiencialList: any= [];   
public tipoemple:any=[];

// Varible publica con la que hago binding de cantidad de caracteres en el textarea
public sttt: string='';
public caracteresenedit: any=[];

// En el constructor inyecto el servicio que me permite vincularme con la API y la alterta MatanckBar, el ROuter y el FormBuilder
constructor(private experiencialService: ExperiencialService, private snack:MatSnackBar, private fb: FormBuilder, private router: Router, private tipoempleoservice: TipoEmpleoService)  { 
}

// metodo get para lessons que es el form array
get lessons() {
return this.form.controls["lessons"] as FormArray;
}

// El metodo que iniciliza el compontente
ngOnInit(): void {

this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; };    
this.cargardata();   
this.cargatiposempleos();

} 

// Sube un elemento a la base de datos
formSubmit() {

if ((this.formularioAlta.valid))    

{console.log("Todos los datos son válidos");

// lleno variable educacion con lo datos de los formcontrols
this.experiencial.nombreEmpresa=this.formularioAlta.get('nombreEmpresa')?.value;
this.experiencial.descripcion=this.formularioAlta.get('descripcion')?.value;

var ppp= this.formularioAlta.get('fechaini')?.value;
var dia = ppp.getDate();
var mes =ppp.getMonth()+1;
var ani = ppp.getFullYear();
var ppp2=mes+"/"+dia+"/"+ani;
this.experiencial.fechaini=ppp2; 

this.experiencial.esTrabajoActual=this.formularioAlta.get('esTrabajoActual')?.value;
console.log("sisisi "+this.experiencial.esTrabajoActual);

var ppp= this.formularioAlta.get('fechafin')?.value;
ppp2="";
if (ppp.toString().length>3) {
var dia = ppp.getDate();
var mes = ppp.getMonth()+1;
var ani = ppp.getFullYear();
var ppp2=mes+"/"+dia+"/"+ani;}
this.experiencial.fechafin=ppp2;  

this.experiencial.personaid=1;
this.experiencial.tipoempleo=this.formularioAlta.get('tipoempleo')?.value;  

// llamo al metodo del servicio para subir los datos a la base de datos
this.experiencialService.anadirExperiencial(this.experiencial).subscribe(
 (data) => {
   console.log(data);
   Swal.fire('Experiencia guardada','Experiencia registrada con exito en el sistema','success');
   this.router.onSameUrlNavigation="reload";
   this.router.navigate(["/experiencial"]);        
 },(error)=> {
   console.log(error);
   this.snack.open("Ha ocurrido un error en el sistema", 'Aceptar', {
     duration: 3000 
   });   
 })} else {
   console.log(this.experiencial.fechaini);
   this.snack.open("Hay campos inválidos en el formulario. Favor, verificar", 'Aceptar', {
     duration: 3000 
   });   
 }     
}  

// llamo al metodo para traer datos del servidor API para exhibir de todos los registros.

public cargatiposempleos() {
  this.tipoempleoservice.listarTipoEmpleo().subscribe((data)=>{
    this.tipoemple=data;
    console.log(this.tipoemple);

    
  },(error)=>
  {console.log("error")});  


}

public cargardata() {    
this.experiencialService.listarExperiencial().subscribe((data)=>{console.log(data);
this.experiencialList=data;

// Recorro el Array, y voy agregando lessonForms a Lesssons;
for(let idd = 0 ; idd < this.experiencialList.length ; idd++){
 
 const lessonForm = this.fb.group({
     nombreEmpresag: [this.experiencialList[idd].nombreEmpresa, [Validators.required]],     
     fechainig: [this.experiencialList[idd].fechaini, Validators.required],      
     esTrabajoActualg: ['', Validators.required],
     fechafing: [this.experiencialList[idd].fechafin],     
     descripciong: [this.experiencialList[idd].descripcion, [Validators.required, Validators.maxLength(200)]],
     tipoempleog: new FormControl(this.experiencialList[idd].tipoempleo, [Validators.required])

 });

 this.lessons.push(lessonForm); 
 this.lessons.at(idd).get('fechainig')?.setValue(this.experiencialList[idd].fechaini);
 this.lessons.at(idd).get('fechainig')?.clearValidators;
 this.lessons.at(idd).get('fechainig')?.updateValueAndValidity;  
 
 console.log("thiiiiisssss");
 var ops=this.experiencialList[idd].tipoempleo;

 
 // Apaga o prende al hacer ciclo dpende de finalizado
 var seb:string;
 console.log(this.experiencialList[idd].esTrabajoActual);
 if (this.experiencialList[idd].esTrabajoActual===true) {seb='true';                  
 this.lessons.at(idd).get('esTrabajoActualg')?.setValue(seb);     
 this.lessons.at(idd).get('fechafing')?.disable();
 this.lessons.at(idd).get('fechafing')?.clearValidators;
 this.lessons.at(idd).get('esTrabajoActualg')?.updateValueAndValidity;
 

 } else {seb='false';     
 this.lessons.at(idd).get('esTrabajoActualg')?.setValue(seb);       
 this.lessons.at(idd).get('fechafing')?.enable(); 
 this.lessons.at(idd).get('fechafing')?.addValidators([Validators.required]);  
 this.lessons.at(idd).get('esTrabajoActualg')?.updateValueAndValidity; 
 }      

 
 this.lessons.at(idd).get('tipoempleog')?.setValue(ops);
 //this.lessons.at(idd).get('tipoempleog')?.updateValueAndValidity;

 
}
 },(error)=>
 {console.log("error")});  
}

// funcione que carga el placeholder de dos de los campos del form edit, fecha ini y fechafin

public placehold(a:number,b:number): string {
if (a===1) 
{return this.experiencialList[b].fechaini;} else 
{
 if (this.lessons.at(b).get('fechafing')?.value.toString()==='') {return ''} else {return this.experiencialList[b].fechafin;}      
}
}

// llamo al metodo del servicio que me permite eliminar un registro
public eliminarexperiencial(idx: number) {
var idu=this.experiencialList[idx].id;
console.log(idu);    
this.experiencialService.eliminarExperiencial(idu).subscribe((data)=>{console.log(data)      
 Swal.fire('Usuario eliminado','Usuario eliminado ok','success');
 console.log("deberia estar todo eliminadion coorecdta");       
 this.router.onSameUrlNavigation="reload";
 this.router.navigate(["/experiencial"]);            

},(error)=>{console.log("No se pudo eliminar usuario");
Swal.fire('No se pudo eliminar Usuario','No se pudo eliminar usuario','success');
});    
}

// Seteos cruzados de formscontrols cuando abro un cuadro de fecha de inicio.-

public cambiafechaini() {
console.log("cambiar fecha ini");    
this.formularioAlta.get('esTrabajoActual')?.enable();
this.formularioAlta.get('esTrabajoActual')?.setValue(true); 
}

public cambiafechafin() {  
console.log("cambiar fecha fin");
this.formularioAlta.get('esTrabajoActual')?.setValue(false);    
}
public cambiafechafinedit(idx: number) {  
console.log("cambiar fecha fin edit");
this.lessons.at(idx).get('esTrabajoActualg')?.setValue(false);    
}

// Seteo cruzado (importante) cuando defino si se coloca Si o No a la finalizacion de estudios (pasan cosas)!
public finalizadochange(e: any) {
if (e.target.value=="false") {
 this.formularioAlta.get('fechafin')?.enable();
 this.formularioAlta.get('fechafin')?.setValue('');
 this.formularioAlta.get('fechafin')?.addValidators([Validators.required])
 this.formularioAlta.controls['fechafin'].updateValueAndValidity();
 
} else {
 
 this.formularioAlta.get('fechafin')?.disable();
 this.formularioAlta.get('fechafin')?.setValue('');
 this.formularioAlta.get('fechafin')?.clearValidators();
 this.formularioAlta.controls['fechafin'].updateValueAndValidity();        
 
}}
// Setea en fucnion del nuevo favlro d finalizado
public finalizadochangeedit(e: any,idx:number) {

if (e.target.value=="true") {
console.log("EDICION TRUE OK");
this.lessons.at(idx).get('fechafing')?.disable();
this.lessons.at(idx).get('fechafing')?.setValue('');
this.lessons.at(idx).get('fechafing')?.clearValidators();
this.lessons.at(idx).get('fechafing')?.updateValueAndValidity();     

} else {

console.log("EDICION TRUE no");
this.lessons.at(idx).get('fechafing')?.setValue('');     
this.lessons.at(idx).get('fechafing')?.enable();
this.lessons.at(idx).get('fechafing')?.addValidators([Validators.required]);
this.lessons.at(idx).updateValueAndValidity();  

}}


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
this.formularioAlta.get('fechafin')?.disable();
this.formularioAlta.get('fechafin')?.clearValidators();
this.formularioAlta.controls['fechafin'].updateValueAndValidity();
this.formularioAlta.get('esTrabajoActual')?.disable(); 
this.formularioAlta.get('esTrabajoActual')?.setValue('');    
this.formularioAlta.get('tipoempleo')?.setValue('0');  
}

// Funcion que entra en accion cuando decido editar un regitro al hacer click en un boton.-  
public editarexperiencial(idx:number) {

this.lessons.at(idx).get('fechainig')?.clearValidators;
this.lessons.at(idx).updateValueAndValidity;    

// la forma que encontre de que realice validaciones al editar entidad.-
console.log(typeof this.lessons.at(idx).get('fechafing')?.errors?.['required']);
console.log(this.lessons.at(idx).get('esTrabajoActualg')?.value);
console.log("es vacio");
console.log(this.lessons.at(idx).get('fechafing')?.value.toString()!=='');

if (
 typeof this.lessons.at(idx).get('nombreEmpresag')?.errors?.['required']==='undefined' && 
 typeof this.lessons.at(idx).get('descripciong')?.errors?.['required']==='undefined' &&
 !this.lessons.at(idx).get('descripciong')?.errors?.['maxlength'] &&
 ((this.lessons.at(idx).get('fechafing')?.value.toString()!=='') || (        
   this.lessons.at(idx).get('esTrabajoActualg')?.value.toString()==='true')
   ))
{

var idu=this.experiencialList[idx].id;   
this.experiencialedit.id=idu;
this.experiencialedit.nombreEmpresa=this.lessons.at(idx).get('nombreEmpresag')?.value;
this.experiencialedit.descripcion=this.lessons.at(idx).get('descripciong')?.value;      

var ppp= this.lessons.at(idx).get('fechainig')?.value;    
if (ppp.toString().length>10) {    
 console.log(ppp.toString().length);
var dia = ppp.getDate();
var mes = ppp.getMonth()+1;
var ani = ppp.getFullYear();
var ppp2=mes+"/"+dia+"/"+ani; } else {ppp2=ppp; console.log("menor q  ue 10");}
this.experiencialedit.fechaini=ppp2;  

var ppp7= this.lessons.at(idx).get('fechafing')?.value;
if (ppp7.toString().length>10) {
var dia = ppp7.getDate();
var mes = ppp7.getMonth()+1;
var ani = ppp7.getFullYear();
var ppp9=mes+"/"+dia+"/"+ani;  } else {ppp9=ppp7}
this.experiencialedit.fechafin=ppp9;  

this.experiencialedit.esTrabajoActual=this.lessons.at(idx).get('esTrabajoActualg')?.value;
this.experiencialedit.tipoempleo=this.lessons.at(idx).get('tipoempleog')?.value;
this.experiencialedit.personaid='1';

// Llama al metodo del servicio necesario para actualizar
this.experiencialService.editarExperiencial(this.experiencialedit).subscribe(
 (data) => {
   console.log(data);
   Swal.fire('Usuario editado guardado','Usuario editado registrado con exito en el sistema','success');

   this.router.onSameUrlNavigation="reload";
   this.router.navigate(["/experiencial"]);
  
 },(error)=> {
   console.log(error);
   this.snack.open("Ha ocurrido un error en el sistema al querer guardar un usuario editado", 'Aceptar', {
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
