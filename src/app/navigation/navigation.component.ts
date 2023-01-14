import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  fasel = "inicio";
  fases = "inicio";
  fasem = "inicio";
  nuser!: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private tokenService: TokenService) { }

  ngOnInit() {

    console.log("MUESTRA AUTORIDADES AL INICIO");

    this.nuser = this.tokenService.getUserName();
    console.log(this.nuser);

    if (this.nuser == null) {
      console.log("esta vacio");
      this.fasel = "inicio";
      this.fases = "nologeado";
      this.fasem = "inicio";
    };
    if (this.nuser == 'user') {
      console.log("es usuario USER");
      this.fasel = "logedasuser";
      this.fases = "logeado";
      this.fasem = "logedasuser";

    };
    if (this.nuser == 'admin') {
      console.log("esta vacio");
      this.fasel = "logedasadmin";
      this.fases = "logeado";
      this.fasem = "logedasadmin";

    };


  }

  login(): void {
    this.fasem = "showloginform";
    this.fases = "porlogearse";

  }

  getback(): void {

    this.fasem = "inicio";
    this.fases = "nologeado";
    this.fasel = "inicio";

  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();

  }

}
