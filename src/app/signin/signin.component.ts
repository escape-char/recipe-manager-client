import { Component, AfterViewInit} from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import {ModalService, ModalView} from '../common/widgets/modal/modal.service';
import {UsersService} from '../common/users/users.service';
import {Modal} from '../common/widgets/modal/modal.component';
import {SignInModalComponent} from './signin-modal.component';

@Component({
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss'],
})
export class SignInComponent implements AfterViewInit{
  constructor(public router: Router, private modalService: ModalService,
              private usersService:UsersService) {

   }
   ngAfterViewInit(){
     console.log("SignInComponent.ngOnInit()");
      let  view:ModalView = this.modalService.create(SignInModalComponent, null, [{provide: "id", useValue: ""}]);
      this.modalService.open(view.id);

   }
}
