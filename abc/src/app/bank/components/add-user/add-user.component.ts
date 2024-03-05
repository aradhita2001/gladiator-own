import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/types/user';
import { CustomValidators } from 'src/app/validators/custom-validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  userError$: Observable<string> = of();
  userSuccess$: Observable<string> = of();
  isFormSubmitted: boolean = false;
  errorMsg: String = "";
  constructor(private customValidator: CustomValidators,
    private formBuilder: FormBuilder,
    private authServie: AuthService
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, this.customValidator.EmailValidator]],
      phone: ["", [Validators.required, this.customValidator.MobileValidator]],
      password: ["", [Validators.required, this.customValidator.PasswordValidator]],
      retypePassword: ["", Validators.required],
      role: ["", Validators.required]
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
      const { } = this.userForm.value;

      const data = this.userForm.value;

      const customer: User = new User(data);

      this.authServie.createUser(customer).subscribe(
        () => {
          this.userSuccess$ = of("User created successfully");
        },
        () => {
          this.userError$ = of("User Alreay Exists:");
        }
      );
    }
  }

}
