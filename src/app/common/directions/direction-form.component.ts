import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ModalService} from '../widgets/modal/modal.service';
import {SessionService} from '../users/session.service';
import {Direction} from '../recipes/recipe';
@Component({
  selector: 'direction-form',
  templateUrl: 'direction-form.html',
})
export class DirectionFormComponent {
  @Input() directionForm:FormGroup;
  submitted = false;
  error:string = "";
  constructor(private modalService:ModalService,
              private router: Router ){
                console.log(this.directionForm);

  }
  getErrors(field:string):any {
    return this.directionForm.controls[field].errors || {};
  }
  getControl(field:string):any {
    return this.directionForm.controls[field];
  }
}
