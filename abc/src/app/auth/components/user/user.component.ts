import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
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

  hasSpecialCharacters(inputString: string): boolean {
    // Define a regular expression for special characters
    const specialCharactersRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    // Test if the inputString contains any special characters
    return specialCharactersRegex.test(inputString);
  }

  onSubmit() {
    this.isFormSubmitted = true;
    this.userSuccess$ = of('');
    this.userError$ = of('');

    if (this.userForm.invalid) {
      return;
    } else {
      const { username, password, email } = this.userForm.value;
      if (password.length < 8) {
        this.userError$ = of("Password must be of 8 characters");
        return;
      }
      if (this.hasSpecialCharacters(username)) {
        this.userError$ = of("User Name must consist of letter and number only!!");
        return;
      }

      const data = this.userForm.value;
      console.log(data);
      const customer: User = new User(data);
      customer.role = "USER";

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
