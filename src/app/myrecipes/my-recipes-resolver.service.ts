import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }    from 'rxjs/Observable';
import {RecipesService } from '../common/recipes/recipes.service';
import {Recipe} from '../common/recipes/recipe';
@Injectable()
export class MyRecipesResolver implements Resolve<Recipe[]> {
  constructor(private rs:  RecipesService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> {
    return this.rs.fetchMine();
  }
}
