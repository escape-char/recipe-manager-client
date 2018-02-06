import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ShoppingCartComponent } from './shoppingcart.component';
import {SharedModule} from '../common/shared.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ShoppingCartComponent
  ],
  providers: [
  ]
})
export class ShoppingCartModule { }
