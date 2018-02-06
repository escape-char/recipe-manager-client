import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ModalService} from '../common/widgets/modal/modal.service';
import {SessionService} from '../common/users/session.service';
import {Ingredient} from '../common/recipes/recipe';
@Component({
  selector: 'ingredient-form',
  templateUrl: 'ingredient-form.html',
})
export class IngredientFormComponent {
  @Input() ingredientForm:FormGroup;
  submitted = false;
  error:string = "";
  constructor(private modalService:ModalService,
              private router: Router ){
                console.log(this.ingredientForm);

  }
  getErrors(field:string):any {
    return this.ingredientForm.controls[field].errors || {};
  }
  getControl(field:string):any {
    return this.ingredientForm.controls[field];
  }
}
