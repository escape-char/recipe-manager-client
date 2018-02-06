import { Routes, RouterModule }         from '@angular/router';
import { MyRecipesComponent } from './myrecipes.component';
import {LoginGuard} from '../common/users/login-guard';
import {MyCategoriesResolver} from '../myrecipes/my-categories-resolver.service';
import {MyRecipesResolver} from './my-recipes-resolver.service';

export const MyRecipesRoutes: Routes = [
  { path: 'my-recipes',
    component: MyRecipesComponent,
    canActivate: [LoginGuard],
    resolve:{
      categories: MyCategoriesResolver,
      recipes: MyRecipesResolver
    }
  },
  { path: '',
    redirectTo: 'my-recipes',
    canActivate: [LoginGuard],
    pathMatch: 'full'
  }
];
