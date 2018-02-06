import { Component, OnInit }        from '@angular/core';
import { Router,
          ActivatedRoute,
         NavigationExtras } from '@angular/router';

import {RecipesService} from '../common/recipes/recipes.service';
import {Recipe} from '../common/recipes/recipe';

@Component({
  selector:'my-recipe-detail',
  templateUrl: './my-recipe-detail.html',
  styleUrls: ['./my-recipe-detail.scss'],
  
})
export class MyRecipeDetailComponent {
  message: string;
  private recipe:Recipe;
  constructor(private router: Router,
            private activeRoute: ActivatedRoute,
            private recipesService: RecipesService) {

   }
   ngOnInit(){
   }
}
