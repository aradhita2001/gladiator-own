import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root",
})

export class CustomValidators {

  matchPassword(f: FormGroup): ValidationErrors | null {
    return f.get('password')?.value == f.get('retypePassword')?.value ? null : { notMatch: true };
  }

  EmailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emailValue = control.value as string;
    if (emailRegex.test(emailValue)) {
      return null;
    }
    return { EmailValidator: true };
  }

  MobileValidator(control: AbstractControl): ValidationErrors | null {
    const mobileRegrex: RegExp = /^[6789][0-9]{9}$/;
    const mobileValue = control.value as string;
    if (mobileRegrex.test(mobileValue)) {
      return null;
    }
    return { MobileValidator: true };
  }

  AmountValidator(control: AbstractControl): ValidationErrors | null {
    const regrex: RegExp = /^(?!0*(\.0+)?$)(\d*(?:\.[0-9]{0,2})?)$/;
    const AmountValue = control.value.toString();
    if (regrex.test(AmountValue)) {
      return null;
    }
    return { AmountValidator: true };
  }

  AccountNumberValidator(control: AbstractControl): ValidationErrors | null {
    const regrex: RegExp = /^[0-9]{1,5}$/;
    const AccountValue = control.value.toString();
    if (regrex.test(AccountValue)) {
      return null;
    }
    return { AccountNumberValidator: true };
  }

  PasswordValidator(control: AbstractControl): ValidationErrors | null {
    let passwordRegrex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    const passwordValue = control.value as string;
    if (passwordRegrex.test(passwordValue)) {
      return null;
    }
    return { PasswordValidator: true };
  }

  TenureValidator(control: AbstractControl): ValidationErrors | null {
    const regrex: RegExp = /^[0-9]{1,2}$/;
    const TenureValue = control.value.toString();
    if (regrex.test(TenureValue)) {
      return null;
    }
    return { TenureValidator: true };
  }
}