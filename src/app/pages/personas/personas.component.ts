import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from 'src/app/services/personas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  

// Este el el form Array de todos los elementos ya cargados en BD para editar / Eliminar
form = this.fb.group({
  lessons: this.fb.array([])
});
public formularioEdicion= new FormGroup({});

// No se usa este Pattern. Solo lo mantengo de referencia
public namePattern = /^.{3}\s[a-zA-Z]{3}\s\d{2}\s\d{4}.{1,}/;  

// Variables educacionedit para inflarla con informacion del registro que quiere editar
public personasedit ={     
  id:1,
  nombre:'',
  apellido:'',
  domicilio:'',
  fechanac:'',
  telefono:'',
  email:'',
  sobremi:'',
  urlfoto:'',
  slogan:1,
  titulo:'',
  inforesumida:'',  
  };

// arrays de cada campo del registro para mostrar los datos de todos los registros que trae la API
public idz:any=[];
public id:any=[];
public nombre:any=[];
public apellido:any=[];
public domicilio:any=[];
public fechanac:any=[];
public telefono:any=[];
public email:any=[];
public sobremi:any=[];
public urlfoto:any=[];
public slogan:any=[];
public titulo:any=[];
public inforesumida:any=[];

// Esta Lista se llenara con los datos de la API en el ENDPOINT listar
public personasList: any= [];   


// Varible publica con la que hago binding de cantidad de caracteres en el textarea
public sttt: string='';
public caracteresenedit: any=[];

// En el constructor inyecto el servicio que me permite vincularme con la API y la alterta MatanckBar, el ROuter y el FormBuilder
constructor(private personasService: PersonasService, private snack:MatSnackBar, private fb: FormBuilder, private router: Router)  { 
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

// llamo al metodo para traer datos del servidor API para exhibir de todos los registros.




public cargardata() {    
this.personasService.listarPersonas().subscribe((data)=>{console.log(data);
this.personasList=data;

// Recorro el Array, y voy agregando lessonForms a Lesssons;
for(let idd = 0 ; idd < this.personasList.length ; idd++){
 
 const lessonForm = this.fb.group({

     nombreg: [this.personasList[idd].nombre, [Validators.required]],
     apellidog: [this.personasList[idd].apellido, [Validators.required]],
     domiciliog: [this.personasList[idd].domicilio, [Validators.required]],                    
     fechanacg: [this.personasList[idd].fechanac, Validators.required],      
     telefonog: [this.personasList[idd].telefono, Validators.required],
     emailg: [this.personasList[idd].email,[Validators.required, Validators.email] ], 
     sobremig: [this.personasList[idd].sobremi, [Validators.required]],
     urlfotog: [this.personasList[idd].urlfoto, [Validators.required]],
     slogang: [this.personasList[idd].slogan, [Validators.required]],  
     titulog: [this.personasList[idd].titulo, [Validators.required]],     
     inforesumidag: [this.personasList[idd].inforesumida, [Validators.required, Validators.maxLength(200)]],     

 });

 this.lessons.push(lessonForm); 
 this.lessons.at(idd).get('fechanacg')?.setValue(this.personasList[idd].fechanac);
 this.lessons.at(idd).get('fechanacg')?.clearValidators;
 this.lessons.at(idd).get('fechanacg')?.updateValueAndValidity;  
 
 console.log("thiiiiisssss");

 
 // Apaga o prende al hacer ciclo dpende de finalizado
 

 
 
}
 },(error)=>
 {console.log("error")});  
}

// funcione que carga el placeholder de dos de los campos del form edit, fecha ini y fechafin

public placehold(a:number,b:number): string {
if (a===1) 
{return this.personasList[b].fechanac;} else 
{
 if (this.lessons.at(b).get('fechanacg')?.value.toString()==='') {return ''} else {return this.personasList[b].fechanac;}      
}
}

// llamo al metodo del servicio que me permite eliminar un registro
public eliminarproyecto(idx: number) {
var idu=this.personasList[idx].id;
console.log(idu);    
this.personasService.eliminarPersonas(idu).subscribe((data)=>{console.log(data)      
 Swal.fire('Proyecto Eliminado','Proyecto eliminado ok','success');
 console.log("deberia estar todo eliminadion coorecdta");       
 this.router.onSameUrlNavigation="reload";
 this.router.navigate(["/proyectos"]);            

},(error)=>{console.log("No se pudo eliminar el proyecto");
Swal.fire('No se pudo eliminar el proyecto','No se pudo eliminar usuario','success');
});    
}

// Seteos cruzados de formscontrols cuando abro un cuadro de fecha de inicio.-






// Seteo cruzado (importante) cuando defino si se coloca Si o No a la finalizacion de estudios (pasan cosas)!

// Setea en fucnion del nuevo favlro d finalizado



// Un simple conteo de caracteres del textarea


// Conteo de caracteres para campo del edit
public contarcaracteresedit(idx: number) {
this.caracteresenedit[idx]="Cantidad de caracteres: "+this.lessons.at(idx).get('inforesumidag')?.value.toString().length +"/200";
}


// Un adicional de limpieza de formulario cuando cliqueo en reset. Adicional porque hay uno por defecto.-


// Funcion que entra en accion cuando decido editar un regitro al hacer click en un boton.-  
public editarproyecto(idx:number) {

this.lessons.at(idx).get('fechanacg')?.clearValidators;
this.lessons.at(idx).updateValueAndValidity;    

// la forma que encontre de que realice validaciones al editar entidad.-
console.log(typeof this.lessons.at(idx).get('fechanacg')?.errors?.['required']);
console.log(this.lessons.at(idx).get('nombreg')?.value);
console.log("es vacio");
console.log(this.lessons.at(idx).get('fechanacg')?.value.toString()!=='');

if (
 typeof this.lessons.at(idx).get('nombreg')?.errors?.['required']==='undefined' && 
 typeof this.lessons.at(idx).get('apellidog')?.errors?.['required']==='undefined' &&
 typeof this.lessons.at(idx).get('domiciliog')?.errors?.['required']==='undefined' && 
 typeof this.lessons.at(idx).get('telefonog')?.errors?.['required']==='undefined' &&
 typeof this.lessons.at(idx).get('emailg')?.errors?.['required']==='undefined' &&
 typeof this.lessons.at(idx).get('emailg')?.errors?.['email']==='undefined' &&
 typeof this.lessons.at(idx).get('sobremig')?.errors?.['required']==='undefined' &&
 typeof this.lessons.at(idx).get('urlfotog')?.errors?.['required']==='undefined' &&
 typeof this.lessons.at(idx).get('slogang')?.errors?.['required']==='undefined' &&
 typeof this.lessons.at(idx).get('titulog')?.errors?.['required']==='undefined' &&

 !this.lessons.at(idx).get('inforesumidag')?.errors?.['maxlength'] &&
 ((this.lessons.at(idx).get('fechanacg')?.value.toString()!=='') 
   ))
{

var idu=this.personasList[idx].id;   
this.personasedit.id=idu;
this.personasedit.nombre=this.lessons.at(idx).get('nombreg')?.value;
this.personasedit.apellido=this.lessons.at(idx).get('apellidog')?.value;    
this.personasedit.domicilio=this.lessons.at(idx).get('domiciliog')?.value;    

var ppp= this.lessons.at(idx).get('fechanacg')?.value;    
if (ppp.toString().length>10) {    
 console.log(ppp.toString().length);
var dia = ppp.getDate();
var mes = ppp.getMonth()+1;
var ani = ppp.getFullYear();
var ppp2=mes+"/"+dia+"/"+ani; } else {ppp2=ppp; console.log("menor q  ue 10");}
this.personasedit.fechanac=ppp2;  



this.personasedit.telefono=this.lessons.at(idx).get('telefonog')?.value;
this.personasedit.email=this.lessons.at(idx).get('emailg')?.value;
this.personasedit.sobremi=this.lessons.at(idx).get('sobremig')?.value;
this.personasedit.id=1;
this.personasedit.urlfoto=this.lessons.at(idx).get('urlfotog')?.value;
this.personasedit.slogan=this.lessons.at(idx).get('slogang')?.value;
this.personasedit.titulo=this.lessons.at(idx).get('titulog')?.value;
this.personasedit.inforesumida=this.lessons.at(idx).get('inforesumidag')?.value;


// Llama al metodo del servicio necesario para actualizar
this.personasService.editarPersonas(this.personasedit).subscribe(
 (data) => {
   console.log(data);
   Swal.fire('Personas editada guardada','Registro Persona editado exitosamente','success');

   this.router.onSameUrlNavigation="reload";
   this.router.navigate(["/personas"]);
  
 },(error)=> {
   console.log(error);
   this.snack.open("Ha ocurrido un error en el sistema. Verifique permisos de usuario.", 'Aceptar', {
     duration: 3000 
   });   
 })
} 
else {
this.snack.open("Favor, verificar posibles errores y/o campos faltantes", 'Aceptar', {
duration: 3000 
});   
}  
}

  





}
