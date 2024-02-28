import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginForm: FormGroup;
    
  constructor(private fb:FormBuilder, private authService : AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }
 
  onSubmit() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe(
        (response)=>{
          // console.log(response);
          
            localStorage.setItem("token", response.token);
            localStorage.setItem("role",response.role);
            // localStorage.setItem("user_id",response.userId);
            // console.log(localStorage.getItem("role"));
            this.router.navigate(["bank/dashboard"]);
        });
        
      // this.authService.login(this.loginForm.value).subscribe(
      //   (data:any) => {console.log(data)},
      //   (error:Error) => {console.log(error.message)});
      
      // console.log("after request");
    }
  }
 
 
}