import { Directive, forwardRef, Attribute } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {SignUpConstants} from '../constants'


function validatePassword(control:FormControl){
  let p:string = control.value;
  if(!p){
    return true;
  }
  else if (p.search(/\d/) == -1) {
          return false;
  } else if (p.search(/[a-zA-Z]/) == -1) {
          return false;
  }
  else if (p.search(/[\!\@\#\$\%\^\&\*\(\)\_\+]/) == -1) {
          return false;
   }else{
     return true;
   }
}
function confirmPassword(password: string, confirmPassword:string){
  return (group:FormGroup): {[key: string]: any} => {
    let password1= group.controls[password];
    let confirmPassword1 = group.controls[confirmPassword];

    if (password1.value !== confirmPassword1.value) {
      return {
        confirmPassword: true
      };
    }
  }

}
export class PasswordValidator {
    constructor(){}
    static checkComplexity(c: FormControl){
        return validatePassword(c) ? null: {validatePassword: true};
    }
    static checkConfirm(p1:string, p2:string){
      return confirmPassword(p1, p2);
    }
}
