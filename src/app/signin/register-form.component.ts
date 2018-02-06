import { Component,Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import{SignUpConstants} from '../common/constants';
import{PasswordValidator} from '../common/users/password.validator';
import {FieldSpinnerComponent} from '../common/widgets/field-spinner.component';
import {ActionButtonComponent}  from '../common/widgets/action-button.component';
import {UsersService} from '../common/users/users.service';
import {User} from '../common/users/user';
import {Utils} from '../common/utils.service';
import {RegisterService, RegisterUser} from '../common/users/register.service';
import {SessionService} from '../common/users/session.service';
import {ModalService} from '../common/widgets/modal/modal.service';

@Component({
  selector: 'register-form',
  templateUrl: 'register-form.html',
  providers: [RegisterService]
})
export class RegisterFormComponent {
  public constants:SignUpConstants = SignUpConstants;
  @Input() modalId:string;

  submitting = false;
  constructor(
              private fb:FormBuilder,
              private usersService:UsersService,
              private registerService:RegisterService,
              private sessionService:SessionService,
              private modalService:ModalService){

  }
  public registerForm = this.fb.group({
    username: ["", [Validators.required,
                   Validators.pattern(new RegExp(SignUpConstants.USERNAME_REGEX)),
                  Validators.minLength(SignUpConstants.USERNAME_MIN_LENGTH),
                  Validators.maxLength(SignUpConstants.USERNAME_MAX_LENGTH)],
                  this.usersService.validateUsernameTaken.bind(this.usersService)
                ],
    email: ["", [Validators.required,
              Validators.pattern(new RegExp(SignUpConstants.EMAIL_REGEX)),
              Validators.minLength(SignUpConstants.EMAIL_MIN_LENGTH),
               Validators.maxLength(SignUpConstants.EMAIL_MAX_LENGTH)],
                this.usersService.validateEmailTaken.bind(this.usersService)],
    firstname: ["", [Validators.required]],
    lastname: ["", [Validators.required]],
    password: ["", [Validators.required,
                    Validators.minLength(SignUpConstants.PASSWORD_MIN_LENGTH),
                  PasswordValidator.checkComplexity]],
    confirmPassword: ["", [Validators.required, PasswordValidator.checkComplexity]],
  },{validator: PasswordValidator.checkConfirm('password', 'confirmPassword')});

  onSubmit(form:any) {
    this.submitting = true;
    console.log(form);
    let user:RegisterUser = new RegisterUser(
      form.controls.username.value,
      form.controls.firstname.value,
      form.controls.lastname.value,
      form.controls.password.value,
      form.controls.email.value,
    );
    this.registerService.register(user).subscribe(
      (data:User) => {
        let that = this;
        setTimeout(function(){
          that.modalService.close(this.modalId);
        }, 1000)
        this.sessionService.update(data);
      },
      (data:any) =>{
      }
    );
    return false;
  }

  get usernameMinLength():number {
    return SignUpConstants.USERNAME_MIN_LENGTH;
  }
  get usernameMaxLength():number {
    return SignUpConstants.USERNAME_MAX_LENGTH;
  }
  get emailMaxLength():number {
    return SignUpConstants.EMAIL_MAX_LENGTH;
  }
  getErrors(field:string):any {
    return this.registerForm.controls[field].errors || {};
  }
  get canSubmit(){
    return (!this.registerForm.pending &&
            !this.registerForm.invalid &&
            !this.submitting);
  }
  getRootErrors():any {
    return this.registerForm.errors || {};
  }
  getControl(field:string):any {
    return this.registerForm.controls[field];
  }
}
