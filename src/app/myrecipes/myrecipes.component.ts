import { Component, OnInit }        from '@angular/core';
import { Router,
          ActivatedRoute,
         NavigationExtras } from '@angular/router';

import {RecipesService} from '../common/recipes/recipes.service';
import {Recipe} from '../common/recipes/recipe';

@Component({
  templateUrl: './myrecipes.html'
})
export class MyRecipesComponent {
  message: string;
  private recipes:Recipe[];

  constructor(private router: Router,
            private activeRoute: ActivatedRoute,
            private recipesService: RecipesService) {


   }
   ngOnInit(){
     this.recipes = this.activeRoute.snapshot.data['recipes'];
     console.log(this.recipes);
   }
}
