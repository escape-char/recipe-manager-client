import {Component, Input} from '@angular/core';

@Component({
  selector: 'field-spinner',
  styles: [],
  template: `<span *ngIf="showSpinner"><i class="fa fa-spinner fa-spin"></i></span>`,
})
export class FieldSpinnerComponent {
  @Input() showSpinner:boolean = false;
}
