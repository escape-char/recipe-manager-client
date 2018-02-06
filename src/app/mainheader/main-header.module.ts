import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { MainHeaderComponent } from './main-header.component';
import {SharedModule} from '../common/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
    ],
  declarations: [
    MainHeaderComponent
  ],
  exports:[
    MainHeaderComponent
  ],
  providers: []
})
export class MainHeaderModule { }
