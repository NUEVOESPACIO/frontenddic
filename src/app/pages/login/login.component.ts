import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  isLogged = false;
  isLogginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;


  user = {
    user: '',
    password: '',
    token: ''
  };

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router, private snack:MatSnackBar) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();

    }

  }

  nada(): void { }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(data => {
      this.isLogged = true;
      this.isLogginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;

      window.location.reload();
      //this.router.navigate([''])

      console.log("ok me loge lo mas bien");
      console.log(data.authorities);
    }, err => {

      //this.isLogged = false;
      //this.isLogged = true;
      //this.errMsj = err.error.mensaje;
      //console.log(this.errMsj);

      this.snack.open("Error en el usuario y/o contraseña. No se pudo logear", 'Aceptar', {
        duration: 3000 
      });   



    }

    )


  }


}
