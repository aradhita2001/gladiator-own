import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navBarOpen=false;
constructor(private router: Router){}

  toggleNavBar(){
  this.navBarOpen=!this.navBarOpen;
}
logout(){
  localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    console.log(localStorage);
    
    this.router.navigate(["/auth"]);
}

}
