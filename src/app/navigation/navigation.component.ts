import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  //que: Number=0;
  isLoggedIn = false;
  showlog=false;
  // True seria que estoy logeado como editor

  //el otro mod es edicion

  //quef(wh: Number) {
  //  this.que=wh;
  //  console.log("Desde quef:")
  //  console.log(this.que);
  //}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}
  
  alter() {
    if (this.isLoggedIn===true) {this.isLoggedIn=false} else {
      this.showlog=true;
      //this.isLoggedIn=true
      
    };
    this.router.onSameUrlNavigation="reload";
    console.log(this.isLoggedIn);
    this.router.navigate(["/navigation"]);
   

  }

}
