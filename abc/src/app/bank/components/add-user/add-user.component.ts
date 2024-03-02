import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/types/user';
import { CustomValidators } from 'src/app/validators/custom-validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  userForm!: FormGroup;
  userError$: Observable<string>=of();
  userSuccess$: Observable<string>=of();
  isFormSubmitted: boolean = false;
  errorMsg :String="";
  constructor(private customValidator: CustomValidators,
    private formBuilder: FormBuilder,
    private authServie: AuthService
  ) {}
   
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required,this.customValidator.EmailValidator]],
      phone:["",Validators.required,this.customValidator.MobileValidator],
      password: ["", [Validators.required,this.customValidator.PasswordValidator]],
      // retypePassword:["",Validators.required,this.matchingPasswords],
      role: ["", Validators.required]
    });
    this.errorMsg="";
  }
   
  hasSpecialCharacters(inputString:string):boolean {
    // Define a regular expression for special characters
    const specialCharactersRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
   
    // Test if the inputString contains any special characters
    return specialCharactersRegex.test(inputString);
  }
  
  onSubmit() {
    this.isFormSubmitted = true;
    this.userSuccess$ = of('');
    this.userError$ = of('');
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   
    if (this.userForm.invalid) {
      return;
    } else {
      const { username, password,email } = this.userForm.value;
      if(password.length < 8)
      {
        this.userError$ = of("Password must be of 8 characters");
        return;
      }
      if(this.hasSpecialCharacters(username))
      {
        this.userError$ = of("User Name must consist of letter and number only!!");
        return;
      }
      console.log(emailRegex.test(email));
      if(!emailRegex.test(email))
      {
        this.userError$ = of("Invalid Email Id!!");
        return;
   
      }
   
      const data=this.userForm.value;
      console.log(data);
      const customer: User = new User(data);
     
      this.authServie.createUser(customer).subscribe(
        (res: any) => {
          this.userSuccess$ = of("User created successfully");
        },
        (error) => {
          this.userError$ = of("User Alreay Exists:");
        }
      );
    }
  }
   
}
