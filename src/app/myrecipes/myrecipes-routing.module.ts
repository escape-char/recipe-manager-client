import { NgModule }             from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { FormsModule }   from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';
import {FieldSpinnerComponent} from '../common/widgets/field-spinner.component';
import {ActionButtonComponent} from '../common/widgets/action-button.component';
import {MyRecipesComponent} from './myrecipes.component';
import {MyRecipesRoutes} from './myrecipes.routing';
import {SharedModule} from '../common/shared.module';
import {MyCategoriesResolver} from './my-categories-resolver.service';
import {MyCategoryFormComponent} from './my-category-form.component';
import {MyCategoryModalComponent} from './my-category-modal.component';
import {MyCategoriesComponent} from './my-categories.component';
import {MyCategoryDeleteModalComponent} from './my-category-delete-modal.component';
import {MyRecipesResolver} from './my-recipes-resolver.service';
import {MyRecipesListComponent} from './my-recipes-list.component';
import {MyRecipeDetailComponent} from './my-recipe-detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MyRecipesRoutes),
    SharedModule
  ],
  declarations:[
    MyCategoriesComponent,
    MyRecipesComponent,
    MyRecipesListComponent,
    MyRecipeDetailComponent,
    MyCategoryFormComponent,
    MyCategoryModalComponent,
    MyCategoryDeleteModalComponent
  ],
  entryComponents:[
    MyCategoryModalComponent,
    MyCategoryDeleteModalComponent
  ],
  providers:[
    MyCategoriesResolver,
    MyRecipesResolver
  ],
  exports: [
    RouterModule,
    MyCategoriesComponent,
    MyCategoryFormComponent,
    MyRecipesComponent
  ]
})
export class MyRecipesRoutingModule { }
