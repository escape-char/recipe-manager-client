import { NgModule }             from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { FormsModule }   from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';

//sign in and register
import {RegisterFormComponent} from './register-form.component';
import {SignInFormComponent} from './signin-form.component';
import {SignInComponent} from './signin.component';


import {FieldSpinnerComponent} from '../common/widgets/field-spinner.component';
import {ActionButtonComponent} from '../common/widgets/action-button.component';
import {SharedModule} from '../common/shared.module';

import {SignInModalComponent}  from './signin-modal.component';
import {SignInRoutes} from './signin.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(SignInRoutes),
    SharedModule
  ],
  declarations:[
    RegisterFormComponent,
    SignInModalComponent,
    SignInComponent,
    SignInFormComponent
  ],
  entryComponents:[
    SignInModalComponent
  ],
  exports: [
    RegisterFormComponent,
    SignInFormComponent,
    RouterModule
  ]
})
export class SignInRoutingModule { }
