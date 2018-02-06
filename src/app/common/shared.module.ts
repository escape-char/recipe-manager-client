import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule}   from '@angular/forms';

import {FieldSpinnerComponent} from './widgets/field-spinner.component';
import {ActionButtonComponent} from './widgets/action-button.component';
//directives
import {DropdownMenuDirective} from './widgets/dropdown-menu.directive';
import {InfiniteScrollingDirective} from './infinite-scrolling.directive';

import {ContenteditableModel}  from './widgets/contenteditable-model.directive';
import {Modal} from './widgets/modal/modal.component';
import{ModifyImageComponent} from './widgets/modify-image/modify-image.component';
import{CategoryChipComponent} from './widgets/category-chip/category-chip.component';
import{DifficultySliderComponent} from './widgets/difficulty-slider/difficulty-slider.component';
import{HourMinuteComponent} from './widgets/hour-minute/hour-minute.component';
import{DropdownListComponent} from './widgets/dropdown-list/dropdown-list.component';
import {FromNowPipe} from './fromnow.pipe';
import {TruncatePipe} from './truncate.pipe';
import {SafeDomPipe} from './safedom.pipe';
import{PositiveIntegerPipe} from './positive-integer.pipe';


@NgModule({
    imports: [
      CommonModule,
      FormsModule
     ],
    declarations: [
      ActionButtonComponent,
      DropdownMenuDirective,
      ContenteditableModel,
      FieldSpinnerComponent,
      ModifyImageComponent,
      CategoryChipComponent,
      InfiniteScrollingDirective,
      DifficultySliderComponent,
      HourMinuteComponent,
      DropdownListComponent,
      FromNowPipe,
      TruncatePipe,
      SafeDomPipe,
      PositiveIntegerPipe,
      Modal
    ],
    exports: [
      ActionButtonComponent,
      DropdownMenuDirective,
      ContenteditableModel,
      FieldSpinnerComponent,
      ModifyImageComponent,
      CategoryChipComponent,
      InfiniteScrollingDirective,
      DifficultySliderComponent,
      HourMinuteComponent,
      DropdownListComponent,
      FromNowPipe,
      TruncatePipe,
      SafeDomPipe,
      PositiveIntegerPipe,
      Modal
    ]
})

export class SharedModule {}
