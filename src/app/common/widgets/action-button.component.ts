import {Component, Input,  Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'action-button',
  styles: [],
  template: `
              <button class="{{defaultClasses}}" [disabled]="actionDisabled"
                  type="{{defaultType}}"
                  (click)="onActionClicked(actionData)">
                <span *ngIf="busy">
                  <i class="fa fa-spinner fa-spin"></i> {{busyLabel}}</span>
                <span *ngIf="!busy">{{defaultLabel}}</span>
              </button>
              `
})
export class ActionButtonComponent {
  @Input() busy:boolean = false;
  @Input() actionDisabled:boolean = false;
  @Input() defaultClasses:string = "";
  @Input() defaultType:string = "";
  @Input() actionData:any = null;
  @Input() busyLabel:string = "Please wait...";
  @Output() onAction: EventEmitter<any> = new EventEmitter();
  @Input() defaultLabel:string = "Okay";

  onActionClicked(data:any){
    console.log("onActionClicked");
    this.onAction.emit(data);
  }
}
