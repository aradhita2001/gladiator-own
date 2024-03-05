import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { User } from "../../types/user";
import { AuthService } from "../../services/auth.service";
import { CustomValidators } from "src/app/validators/custom-validator";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})

export class UserComponent implements OnInit {

  userForm!: FormGroup;
  userError$: Observable<string> = of();
  userSuccess$: Observable<string> = of();
  isFormSubmitted: boolean = false;
  errorMsg: String = "";

  constructor(public customValidator: CustomValidators,
    private formBuilder: FormBuilder,
    private authServie: AuthService
  ) {

  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, this.customValidator.EmailValidator]],
      phone: ["", [Validators.required, this.customValidator.MobileValidator]],
      password: ["", [Validators.required, this.customValidator.PasswordValidator]],
      retypePassword: ['', [Validators.required]]
    },
      {
        validator: this.customValidator.matchPassword
      });

    this.errorMsg = "";
  }



  onSubmit() {
    this.isFormSubmitted = true;
    this.userSuccess$ = of('');
    this.userError$ = of('');

    if (this.userForm.invalid) {
      return;
    } else {

      const data = this.userForm.value;

      const customer: User = new User(data);
      customer.role = "USER";

      this.authServie.createUser(customer).subscribe(
        (res: any) => {
          this.userSuccess$ = of("User created successfully");
        },
        (error) => {
          this.userError$ = of("User Alreay Exists");
        }
      );
    }
  }
}
