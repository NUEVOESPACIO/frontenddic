import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { timeStamp } from 'console';
import { UserService } from 'src/app/services/user.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  public user ={
    username:'',
    password:'',
    nombre:'',
    apellido:'',
    email:'',
    telefono:''
  };

  public useredit ={
    id:0,
    username:'',
    password:'',
    nombre:'',
    apellido:'',
    email:'',
    telefono:''
  }; 

  public id:any=[];
  public username:any=[];
  public password:any=[];
  public nombre:any=[];
  public apellido:any=[];
  public email:any=[];
  public telefono:any=[];

  public usuariosList: any= [];
  
  constructor(private userService: UserService, private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.cargardata();           
  }

  formSubmit() {
    console.log(this.user);
    if (this.user.username== '' || this.user.username == null) {
      this.snack.open("El nombre de usuario es requerido", 'Aceptar', {
        duration: 3000, 
        verticalPosition:'top',
        horizontalPosition: 'right'
      });      
 
      return;
      
    }

    this.userService.anadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
        this.ngOnInit();
      },(error)=> {
        console.log(error);
        this.snack.open("Ha ocurrido un error en el sistema", 'Aceptar', {
          duration: 3000 
        });   
      })
  }

  public cargardata() {    
    this.userService.listarUsuarios().subscribe((data)=>{console.log(data);
    this.usuariosList=data;  
    },(error)=>{console.log("error")});  
  }

  public eliminarusuario(idu: number) {
    
    this.userService.eliminarusuario(idu).subscribe((data)=>{console.log(data)      
      Swal.fire('Usuario eliminado','Usuario eliminado ok','success');
      this.ngOnInit();      
    },(error)=>{console.log("No se pudo eliminar usuario");
    Swal.fire('No se pudo eliminar Usuario','No se pudo eliminar usuario','success');
  });  
  }
  
  public editarusuario(idu: number,idx:number) {

    this.useredit.id=idu;
    this.useredit.username=this.notNullString(this.username[idu],this.usuariosList[idx].username);
    this.useredit.password=this.notNullString(this.password[idu],this.usuariosList[idx].password);
    this.useredit.nombre=this.notNullString(this.nombre[idu],this.usuariosList[idx].nombre);
    this.useredit.apellido=this.notNullString(this.apellido[idu],this.usuariosList[idx].apellido);
    this.useredit.email=this.notNullString(this.email[idu],this.usuariosList[idx].email);
    this.useredit.telefono=this.notNullString(this.telefono[idu],this.usuariosList[idx].telefono);

     this.userService.editarUsuario(this.useredit).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario editado guardado','Usuario editado registrado con exito en el sistema','success');
       this.ngOnInit();
      },(error)=> {
        console.log(error);
        this.snack.open("Ha ocurrido un error en el sistema usuarioeditgado", 'Aceptar', {
          duration: 3000 
        });   
      })
  }

  public notNullString(a: any, b:any): any {
    if (typeof a==='undefined') {return b;} else {return a};
  }

}
