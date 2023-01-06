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
import { TipoEmpleoService } from 'src/app/services/tipoempleo.service';


@Component({
  selector: 'app-tipoempleo',
  templateUrl: './tipoempleo.component.html',
  styleUrls: ['./tipoempleo.component.css']
})

export class TipoEmpleoComponent implements OnInit {

// Este el el form Array de todos los elementos ya cargados en BD para editar / Eliminar
  form = this.fb.group({
       lessons: this.fb.array([])
});
public formularioEdicion= new FormGroup({});
   
  // No se usa este Pattern. Solo lo mantengo de referencia
  public namePattern = /^.{3}\s[a-zA-Z]{3}\s\d{2}\s\d{4}.{1,}/;  

  // Creo el formulario para generar el alta con sus FormControls

  formularioAlta = new FormGroup({
    tipoempleo: new FormControl('', [Validators.required]),    
  });

  // Variable sobre la que alojare propiedades para enviar a la API sus campos deben coincidir con el modelo
  public tipoempleo ={     
    tipoEmpleo:''    
  };

  // Variables que deben coindidir sus campos con el modelo
  public tipoempleoedit ={
    id:0,
    tipoEmpleo:''    
  };

  // arrays de cada campo del registro para mostrar los datos de todos los registros que trae la API
  public idz:any=[];
  public id:any=[];
  public tipodempleo:any=[];
  
  // Esta Lista se llenara con los datos de la API en el ENDPOINT listar
  public tipoempleoList: any= [];   
  
  // Varible publica con la que hago binding de cantidad de caracteres en el textarea
  public sttt: string='';
  public caracteresenedit: any=[];
  
  // En el constructor inyecto el servicio que me permite vincularme con la API y la alterta MatanckBar, el ROuter y el FormBuilder
  constructor(private tipoempleoService: TipoEmpleoService, private snack:MatSnackBar, private fb: FormBuilder, private router: Router)  { 
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

    // lleno variable on lo datos de los formcontrols
    this.tipoempleo.tipoEmpleo=this.formularioAlta.get('tipoempleo')?.value;    
    
    // llamo al metodo del servicio para subir los datos a la base de datos
    this.tipoempleoService.anadirTipoEmpleo(this.tipoempleo).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
        this.router.onSameUrlNavigation="reload";
        this.router.navigate(["/tipoempleo"]);        
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
    this.tipoempleoService.listarTipoEmpleo().subscribe((data)=>{console.log(data);
    this.tipoempleoList=data;

   // Recorro el Array, y voy agregando lessonForms a Lesssons;
    for(let idd = 0 ; idd < this.tipoempleoList.length ; idd++){
      
      const lessonForm = this.fb.group({
          tipoempleog: [this.tipoempleoList[idd].tipoEmpleo, [Validators.required]],
          
      });

      this.lessons.push(lessonForm); 
      
      // Apaga o prende al hacer ciclo dpende de finalizado
      var seb:string;
      
    }
      },(error)=>
      {console.log("error")});  
  }

  
  
  // llamo al metodo del servicio que me permite eliminar un registro
  public eliminartipoempleo(idx: number) {
    var idu=this.tipoempleoList[idx].id;
    console.log(idu);    
    this.tipoempleoService.eliminarTipoEmpleo(idu).subscribe((data)=>{console.log(data)      
      Swal.fire('Usuario eliminado','Usuario eliminado ok','success');
      console.log("deberia estar todo eliminadion coorecdta");       
      this.router.onSameUrlNavigation="reload";
      this.router.navigate(["/tipoempleo"]);            
    
    },(error)=>{console.log("No se pudo eliminar usuario");
    Swal.fire('No se pudo eliminar Usuario','No se pudo eliminar usuario','success');
  });    
  }

  // Seteos cruzados de formscontrols cuando abro un cuadro de fecha de inicio.-
 
  
  

  // Un adicional de limpieza de formulario cuando cliqueo en reset. Adicional porque hay uno por defecto.-
  public limpiar() {    
    
  }
  
  // Funcion que entra en accion cuando decido editar un regitro al hacer click en un boton.-  
  public editartipoempleo(idx:number) {

     
    // la forma que encontre de que realice validaciones al editar entidad.-
    if (
      typeof this.lessons.at(idx).get('tipoempleog')?.errors?.['required']==='undefined')
      
    {

    var idu=this.tipoempleoList[idx].id;   
    this.tipoempleoedit.id=idu;
    this.tipoempleoedit.tipoEmpleo=this.lessons.at(idx).get('tipoempleog')?.value;
    
    
    // Llama al metodo del servicio necesario para actualizar
    this.tipoempleoService.editarTipoEmpleo(this.tipoempleoedit).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario editado guardado','Usuario editado registrado con exito en el sistema','success');

        this.router.onSameUrlNavigation="reload";
        this.router.navigate(["/tipoempleo"]);
       
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