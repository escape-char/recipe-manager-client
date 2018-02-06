import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

import {CategoriesService } from '../common/categories/categories.service';
import {Category} from '../common/categories/category';
@Injectable()
export class MyCategoriesResolver implements Resolve<Category[]> {
  constructor(private cs: CategoriesService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
    return this.cs.fetchMine();
  }
}
