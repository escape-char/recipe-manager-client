import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ModalService} from '../common/widgets/modal/modal.service';
import {SessionService} from '../common/users/session.service';
import {User} from '../common/users/user';
import {NewCategory} from '../common/categories/category';
@Component({
  selector: 'my-category-form',
  templateUrl: 'my-category-form.html',
})
export class MyCategoryFormComponent {
  @Input() categoryForm:FormGroup;
  submitted = false;
  error:string = "";
  constructor(private modalService:ModalService,
              private router: Router ){
                console.log("testing inside MyNewCategoryFormComponent")
                console.log(this.categoryForm);

  }
  getErrors(field:string):any {
    return this.categoryForm.controls[field].errors || {};
  }
  getControl(field:string):any {
    return this.categoryForm.controls[field];
  }
}
