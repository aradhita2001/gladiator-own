import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { User } from "../../types/user";
import { AuthService } from "../../services/auth.service";
 
 
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
// export class UserComponent implements OnInit {
//   userForm: FormGroup;
//   userError$: Observable<string>;
//   userSuccess$: Observable<string>;
//   isFormSubmitted: boolean = false;
 
//   constructor(
//     private formBuilder: FormBuilder,
//     private authServie: AuthService
//   ) {}
 
//   ngOnInit(): void {
//     this.userForm = this.formBuilder.group({
//       userId: ["", [Validators.required]],
//       password: ["", [Validators.required]],
//       role: ["", [Validators.required]],
//     });
//   }
 
//   onSubmit() {
//      //@todo:  when form is submitted make sure relevant fields (userId, password and role) are not empty, and make an api call to create user
//      // Display a successful (User added successfully) or error message (Unable to create user) to the user. You can use userSuccess$ and userError$ variables given to you for this.
 
//   }
// }
export class UserComponent {
 
 
userForm!: FormGroup;
userError$: Observable<string>=of();
userSuccess$: Observable<string>=of();
isFormSubmitted: boolean = false;
errorMsg :String="";
constructor(
  private formBuilder: FormBuilder,
  private authServie: AuthService
) {}
 
ngOnInit(): void {
  this.userForm = this.formBuilder.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required,this.EmailValidator]],
    phone:["",Validators.required,this.MobileValidator],
    password: ["", [Validators.required,this.PasswordValidator]],
    retypePassword:["",Validators.required,this.matchingPasswords]
  });
  this.errorMsg="";
}
 
 
matchingPasswords(password: string , retypePassword: string ) {
  // console.log('0');
  return (group: FormGroup) => {
    if (group.controls[password].value === group.controls[retypePassword].value) {
      // console.log('1');
      return null;
    } else {
      // console.log('2');
      return { 'matchingPasswords': true };
    }
  };
}
 
 
 
 hasSpecialCharacters(inputString:string):boolean {
  // Define a regular expression for special characters
  const specialCharactersRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
 
  // Test if the inputString contains any special characters
  return specialCharactersRegex.test(inputString);
}
EmailValidator(control: AbstractControl):  ValidationErrors | null{
  const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let emailValue=control.value as string;
  if(emailRegex.test(emailValue)){
    return null ;
 
  }
  return {EmailValidator :true};
}
 
MobileValidator(control: AbstractControl):  ValidationErrors | null{
  const mobileRegrex : RegExp= /^[0-9]{10,12}/;
  const mobileValue=control.value.toString();
  if(mobileRegrex.test(mobileValue)){
     return null;
 
  }
  return {MobileValidator :true};
}
 
PasswordValidator(control : AbstractControl): ValidationErrors |null{
  let passwordRegrex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  const passwordValue= control.value as string;
  if(passwordRegrex.test(passwordValue)){
    return null;
  }
  return {PasswordValidator : true};
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
 