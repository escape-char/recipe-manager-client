import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate,
  Inject} from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';

import {SignInFormComponent} from './signin-form.component';
import {RegisterFormComponent} from './register-form.component';
import {ModalService} from '../common/widgets/modal/modal.service';
import {Utils} from '../common/utils.service';
import {modalAnimations} from '../common/animations';

@Component({
  selector: 'signin-modal',
  templateUrl: './signin-modal.html',
  styleUrls: ['./signin.scss'],
  entryComponents: [
    SignInFormComponent,
    RegisterFormComponent
  ],
  animations:modalAnimations
})
export class SignInModalComponent{
  public static modalId = Utils.uuid();
  private STATE_OPEN:string = "in";
  private STATE_CLOSE:string = "out";

  state:string = this.STATE_OPEN;
  id: string;
  _modalId:string;
  constructor(private modalService: ModalService) {
    this._modalId = SignInModalComponent.modalId;
    this.modalService.currentModalView.subscribe(
      data =>{
        if(data.event === 0){
          this.state = this.STATE_OPEN;
        }else{
          this.state = this.STATE_CLOSE;
        }
      }
    );

   }
   close(){
     this.state = this.STATE_CLOSE;
     let that = this;
     setTimeout(function(){
       that.modalService.close(SignInModalComponent.modalId);
     }, 1000)
   }
}
