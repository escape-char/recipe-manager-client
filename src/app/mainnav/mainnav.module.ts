import { NgModule }       from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { CommonModule }   from '@angular/common';
import { RouterModule} from '@angular/router';
import { MainNavComponent } from './mainnav.component';
import { MainNavRoutes } from './mainnav.routing';
import {SharedModule} from '../common/shared.module';
import {MyRecipesRoutingModule} from '../myrecipes/myrecipes-routing.module';
import {RecipeModalComponent} from '../common/recipes/recipe-modal.component';
import {IngredientsComponent} from '../common/ingredients/ingredients.component';
import {IngredientFormComponent} from '../common/ingredients/ingredient-form.component';
import {IngredientModalComponent} from '../common/ingredients/ingredient-modal.component';
import {DirectionsComponent} from '../common/directions/directions.component';
import {DirectionFormComponent} from '../common/directions/direction-form.component';
import {DirectionModalComponent} from '../common/directions/direction-modal.component';
import {RecipeFormComponent} from '../common/recipes/recipe-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MyRecipesRoutingModule,
  ],
  declarations: [
    MainNavComponent,
    RecipeModalComponent,
    RecipeFormComponent,
    IngredientsComponent,
    IngredientFormComponent,
    IngredientModalComponent,
    DirectionsComponent,
    DirectionFormComponent,
    DirectionModalComponent
  ],
  entryComponents:[
    RecipeModalComponent,
    RecipeFormComponent,
    IngredientsComponent,
    IngredientModalComponent,
    IngredientFormComponent,
    DirectionsComponent,
    DirectionModalComponent,
    DirectionFormComponent
  ],
  exports:[
    MainNavComponent
  ],
  providers: [
  ]
})
export class MainNavModule { }
