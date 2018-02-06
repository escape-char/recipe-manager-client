import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';

//sign in and register
import {RegisterFormComponent} from './register-form.component';
import {SignInFormComponent} from './signin-form.component';
@NgModule({
  imports: [
   CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SignInFormComponent,
  ],
  declarations: [
    RegisterFormComponent,
    SignInFormComponent
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class signInModule { }
