import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EducacionService } from 'src/app/services/educacion.service';
import  Swal  from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, Form, AnyForUntypedForms} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { time } from 'console';
import { getLocaleTimeFormat } from '@angular/common';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit {

// Este el el form Array de todos los elementos ya cargados en BD para editar / Eliminar
  form = this.fb.group({
       lessons: this.fb.array([])
});
public formularioEdicion= new FormGroup({});

   
  // No se usa este Pattern. Solo lo mantengo de referencia
  public namePattern = /^.{3}\s[a-zA-Z]{3}\s\d{2}\s\d{4}.{1,}/;  

  // Creo el formulario para generar el alta con sus FormControls

  formularioAlta = new FormGroup({
    institucion: new FormControl('', [Validators.required]),
    titulo_obtenido: new FormControl('', [Validators.required]),    
    fechaini: new FormControl('',[Validators.required]), 
    finalizado: new FormControl({value: '', disabled: true},[Validators.required]), 
    fechafin: new FormControl({value: '', disabled: true}), 
    ubicacion: new FormControl('', [Validators.required]),
    comentario: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  // Variable educacion sobre la que alojare propiedades para enviar a la API
  public educacion ={     
    institucion:'',
    titulo_obtenido:'',
    fechaini:'',
    fechafin:'',
    finalizado:false,
    ubicacion:'',
    comentario:'',
    pertenecea:1
  };

  // Variables educacionedit para inflarla con informacion del registro que quiere editar
  public educacionedit ={
    id:0,
    institucion:'',
    titulo_obtenido:'',
    fechaini:'',
    fechafin:'',
    finalizado:false,
    ubicacion:'',
    comentario:'',
    pertenecea:1
  };

  // arrays de cada campo del registro para mostrar los datos de todos los registros que trae la API
  public idz:any=[];
  public id:any=[];
  public institucion:any=[];
  public titulo_obtenido:any=[];
  public fechaini:any=[];
  public fechafin:any=[];
  public finalizado:any=[];
  public ubicacion:any=[];
  public comentario:any=[];
  public pertenecea:any=[];

  // Esta Lista se llenara con los datos de la API en el ENDPOINT listar
  public educacionList: any= [];   
  
  // Varible publica con la que hago binding de cantidad de caracteres en el textarea
  public sttt: string='';
  public caracteresenedit: any=[];
  
  // En el constructor inyecto el servicio que me permite vincularme con la API y la alterta MatanckBar, el ROuter y el FormBuilder
  constructor(private educacionService: EducacionService, private snack:MatSnackBar, private fb: FormBuilder, private router: Router)  { 
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
    this.educacion.institucion=this.formularioAlta.get('institucion')?.value;
    this.educacion.titulo_obtenido=this.formularioAlta.get('titulo_obtenido')?.value;
    
    var ppp= this.formularioAlta.get('fechaini')?.value;
    var dia = ppp.getDate();
    var mes =ppp.getMonth()+1;
    var ani = ppp.getFullYear();
    var ppp2=mes+"/"+dia+"/"+ani;
    this.educacion.fechaini=ppp2; 

    this.educacion.finalizado=this.formularioAlta.get('finalizado')?.value;

    var ppp= this.formularioAlta.get('fechafin')?.value;
    ppp2="";
    if (ppp.toString().length>3) {
    var dia = ppp.getDate();
    var mes = ppp.getMonth()+1;
    var ani = ppp.getFullYear();
    var ppp2=mes+"/"+dia+"/"+ani;}
    this.educacion.fechafin=ppp2;  
    
    this.educacion.ubicacion=this.formularioAlta.get('ubicacion')?.value;
    this.educacion.comentario=this.formularioAlta.get('comentario')?.value;  

    // llamo al metodo del servicio para subir los datos a la base de datos
    this.educacionService.anadirEducacion(this.educacion).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
        this.router.onSameUrlNavigation="reload";
        this.router.navigate(["/educacion"]);        
      },(error)=> {
        console.log(error);
        this.snack.open("Ha ocurrido un error en el sistema", 'Aceptar', {
          duration: 3000 
        });   
      })} else {
        console.log(this.educacion.fechaini);
        this.snack.open("Hay campos inválidos en el formulario. Favor, verificar", 'Aceptar', {
          duration: 3000 
        });   
      }     
  }  

  // llamo al metodo para traer datos del servidor API para exhibir de todos los registros.
  public cargardata() {    
    this.educacionService.listarEducacion().subscribe((data)=>{console.log(data);
    this.educacionList=data;

   // Recorro el Array, y voy agregando lessonForms a Lesssons;
    for(let idd = 0 ; idd < this.educacionList.length ; idd++){
      
      const lessonForm = this.fb.group({
          instituciong: [this.educacionList[idd].institucion, [Validators.required]],
          titulo_obtenidog: [this.educacionList[idd].titulo_obtenido, Validators.required],
          fechainig: [this.educacionList[idd].fechaini, Validators.required],      
          finalizadog: ['', Validators.required],
          fechafing: [this.educacionList[idd].fechafin],
          ubicaciong: [this.educacionList[idd].ubicacion, Validators.required],
          comentariog: [this.educacionList[idd].comentario, [Validators.required, Validators.maxLength(200)]]

      });

      this.lessons.push(lessonForm); 
      this.lessons.at(idd).get('fechainig')?.setValue(this.educacionList[idd].fechaini);
      this.lessons.at(idd).get('fechainig')?.clearValidators;
      this.lessons.at(idd).get('fechainig')?.updateValueAndValidity;        
      
      // Apaga o prende al hacer ciclo dpende de finalizado
      var seb:string;
      if (this.educacionList[idd].finalizado===true) {seb='true';                  
      this.lessons.at(idd).get('finalizadog')?.setValue(seb);     
      this.lessons.at(idd).get('fechafing')?.enable();
      this.lessons.at(idd).get('fechafing')?.addValidators([Validators.required]) 
      this.lessons.at(idd).get('finalizadog')?.updateValueAndValidity;
      

      } else {seb='false';    
      this.lessons.at(idd).get('finalizadog')?.setValue(seb);       
      this.lessons.at(idd).get('fechafing')?.disable(); 
      this.lessons.at(idd).get('fechafing')?.clearValidators;
      this.lessons.at(idd).get('finalizadog')?.updateValueAndValidity; 
      }      
      
    }
      },(error)=>
      {console.log("error")});  
  }

// funcione que carga el placeholder de dos de los campos del form edit, fecha ini y fechafin

  public placehold(a:number,b:number): string {
    if (a===1) 
    {return this.educacionList[b].fechaini;} else 
    {
      if (this.lessons.at(b).get('fechafing')?.value==='') {return ''} else {return this.educacionList[b].fechafin;}      
    }
  }
  
  // llamo al metodo del servicio que me permite eliminar un registro
  public eliminareducacion(idx: number) {
    var idu=this.educacionList[idx].id;
    console.log(idu);    
    this.educacionService.eliminareducacion(idu).subscribe((data)=>{console.log(data)      
      Swal.fire('Usuario eliminado','Usuario eliminado ok','success');
      console.log("deberia estar todo eliminadion coorecdta");       
      this.router.onSameUrlNavigation="reload";
      this.router.navigate(["/educacion"]);            
    
    },(error)=>{console.log("No se pudo eliminar usuario");
    Swal.fire('No se pudo eliminar Usuario','No se pudo eliminar usuario','success');
  });    
  }

  // Seteos cruzados de formscontrols cuando abro un cuadro de fecha de inicio.-
 
  public cambiafechaini() {
    console.log("cambiar fecha ini");    
    this.formularioAlta.get('finalizado')?.enable();
    this.formularioAlta.get('finalizado')?.setValue(false); 
  }
 
  public cambiafechafin() {  
    console.log("cambiar fecha fin");
    this.formularioAlta.get('finalizado')?.setValue(true);    
  }
  public cambiafechafinedit(idx: number) {  
    console.log("cambiar fecha fin edit");
    this.lessons.at(idx).get('finalizadog')?.setValue(true);    
  }
  
  // Seteo cruzado (importante) cuando defino si se coloca Si o No a la finalizacion de estudios (pasan cosas)!
  public finalizadochange(e: any) {
     if (e.target.value=="true") {
      this.formularioAlta.get('fechafin')?.enable();
      this.formularioAlta.get('fechafin')?.addValidators([Validators.required])
      this.formularioAlta.controls['fechafin'].updateValueAndValidity();
      
    } else {
      this.formularioAlta.get('fechafin')?.setValue('');
      this.formularioAlta.get('fechafin')?.disable();
      this.formularioAlta.get('fechafin')?.clearValidators();
      this.formularioAlta.controls['fechafin'].updateValueAndValidity();        
      
  }}
  // Setea en fucnion del nuevo favlro d finalizado
  public finalizadochangeedit(e: any,idx:number) {
   
    if (e.target.value=="true") {
     console.log("EDICION TRUE OK");
     this.lessons.at(idx).get('fechafing')?.enable();
     this.lessons.at(idx).get('fechafing')?.setValue('');
     this.lessons.at(idx).get('fechafing')?.addValidators([Validators.required]);
     this.lessons.at(idx).get('fechafing')?.updateValueAndValidity();     

   } else {
    
     this.lessons.at(idx).get('fechafing')?.setValue('');     
     this.lessons.at(idx).get('fechafing')?.disable();
     this.lessons.at(idx).get('fechafing')?.clearValidators();
     this.lessons.at(idx).updateValueAndValidity();  
     
 }}

  
  // Un simple conteo de caracteres del textarea
  public contarcaracteres() {
    this.sttt="Cantidad de caracters: "+ this.formularioAlta.get('comentario')?.value?.length?.toString()+"/200";
  }

  // Conteo de caracteres para campo del edit
  public contarcaracteresedit(idx: number) {
    this.caracteresenedit[idx]="Cantidad de caracteres: "+this.lessons.at(idx).get('comentariog')?.value.toString().length +"/200";
  }


  // Un adicional de limpieza de formulario cuando cliqueo en reset. Adicional porque hay uno por defecto.-
  public limpiar() {    
    this.formularioAlta.get('fechafin')?.disable();
    this.formularioAlta.get('fechafin')?.clearValidators();
    this.formularioAlta.controls['fechafin'].updateValueAndValidity();
    this.formularioAlta.get('finalizado')?.disable(); 
    this.formularioAlta.get('finalizado')?.setValue('');    
  }
  
  // Funcion que entra en accion cuando decido editar un regitro al hacer click en un boton.-  
  public editareducacion(idx:number) {

    this.lessons.at(idx).get('fechainig')?.clearValidators;
    this.lessons.at(idx).updateValueAndValidity;    
    
    // la forma que encontre de que realice validaciones al editar entidad.-
    if (
      typeof this.lessons.at(idx).get('titulo_obtenidog')?.errors?.['required']==='undefined' &&
      typeof this.lessons.at(idx).get('instituciong')?.errors?.['required']==='undefined' &&
      typeof this.lessons.at(idx).get('ubicaciong')?.errors?.['required']==='undefined' &&
      typeof this.lessons.at(idx).get('comentariog')?.errors?.['required']==='undefined' &&
      ((typeof this.lessons.at(idx).get('fechafing')?.errors?.['required']==='undefined') || (        
        this.lessons.at(idx).get('finalizadog')?.value===false)
        ))
    {

    var idu=this.educacionList[idx].id;   
    this.educacionedit.id=idu;
    this.educacionedit.institucion=this.lessons.at(idx).get('instituciong')?.value;
    this.educacionedit.titulo_obtenido=this.lessons.at(idx).get('titulo_obtenidog')?.value;      
    
    var ppp= this.lessons.at(idx).get('fechainig')?.value;    
    if (ppp.toString().length>10) {    
      console.log(ppp.toString().length);
    var dia = ppp.getDate();
    var mes = ppp.getMonth()+1;
    var ani = ppp.getFullYear();
    var ppp2=mes+"/"+dia+"/"+ani; } else {ppp2=ppp; console.log("menor q  ue 10");}
    this.educacionedit.fechaini=ppp2;  
    
    var ppp7= this.lessons.at(idx).get('fechafing')?.value;
    if (ppp7.toString().length>10) {
    var dia = ppp7.getDate();
    var mes = ppp7.getMonth()+1;
    var ani = ppp7.getFullYear();
    var ppp9=mes+"/"+dia+"/"+ani;  } else {ppp9=ppp7}
    this.educacionedit.fechafin=ppp9;  

    this.educacionedit.finalizado=this.lessons.at(idx).get('finalizadog')?.value;
    this.educacionedit.ubicacion=this.lessons.at(idx).get('ubicaciong')?.value;
    this.educacionedit.comentario=this.lessons.at(idx).get('comentariog')?.value;
    this.educacionedit.pertenecea=1;

    // Llama al metodo del servicio necesario para actualizar
    this.educacionService.editarEducacion(this.educacionedit).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario editado guardado','Usuario editado registrado con exito en el sistema','success');

        this.router.onSameUrlNavigation="reload";
        this.router.navigate(["/educacion"]);
       
      },(error)=> {
        console.log(error);
        this.snack.open("Ha ocurrido un error en el sistema al querer guardar un usuario editado", 'Aceptar', {
          duration: 3000 
        });   
      })
  } 
else {
  console.log(this.educacion.fechaini);
  this.snack.open("Favor, verificar posibles errores en los datos", 'Aceptar', {
    duration: 3000 
  });   
}  
}
  
}