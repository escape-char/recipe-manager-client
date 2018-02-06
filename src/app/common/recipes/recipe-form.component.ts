import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ModalService} from '../widgets/modal/modal.service';
import {SessionService} from '../users/session.service';
import {Recipe} from '../recipes/recipe';
@Component({
  selector: 'recipe-form',
  templateUrl: 'recipe-form.html',
})
export class RecipeFormComponent {
  @Input() recipeForm:FormGroup;
  submitted = false;
  error:string = "";
  constructor(private modalService:ModalService,
              private router: Router ){
                console.log(this.recipeForm);

  }
  getErrors(field:string):any {
    return this.recipeForm.controls[field].errors || {};
  }
  getControl(field:string):any {
    return this.recipeForm.controls[field];
  }
}
