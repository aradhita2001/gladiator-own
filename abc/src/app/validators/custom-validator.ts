import { Injectable } from "@angular/core";
import { FormBuilder, AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: "root",
})

export class CustomValidators {
    // constructor(private formBuilder: FormBuilder) {}
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
  
  AmountValidator(control:AbstractControl): ValidationErrors | null {
    const regrex:RegExp=/^(?!0*(\.0+)?$)(\d*(?:\.[0-9]{0,4})?)$/;
    const AmountValue=control.value.toString();
    if(regrex.test(AmountValue))
    {
      return null;
    }
    return {
      AmountValidator:true
    };
  }
  
  UseridValidator(control:AbstractControl): ValidationErrors | null {
    const regrex:RegExp=/^[0-9]{1,2}/;
    const userValue=control.value.toString();
    if(regrex.test(userValue))
    {
      return null;
    }
    return{UseridValidator:true};
  }

  AccountNumberValidator(control:AbstractControl): ValidationErrors | null {
    const regrex:RegExp=/^[0-9]{1,2}/;
    const AccountValue=control.value.toString();
    if(regrex.test(AccountValue))
    {
      return null;
    }
    return{AccountNumberValidator:true};
  }
   
  PasswordValidator(control : AbstractControl): ValidationErrors |null{
    let passwordRegrex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    const passwordValue= control.value as string;
    if(passwordRegrex.test(passwordValue)){
      return null;
    }
    return {PasswordValidator : true};
  }
    hasSpecialCharacters(inputString:string):boolean {
      // Define a regular expression for special characters
      const specialCharactersRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
   
      // Test if the inputString contains any special characters
      return specialCharactersRegex.test(inputString);
    }
   }