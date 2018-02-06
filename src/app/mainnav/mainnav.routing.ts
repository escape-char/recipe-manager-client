import { Routes }         from '@angular/router';
import { MyRecipesComponent } from '../myrecipes/myrecipes.component';
import { ShoppingCartComponent } from '../shoppingcart/shoppingcart.component';
import { BrowseComponent } from '../browse/browse.component';
import {LoginGuard} from '../common/users/login-guard';

export const MainNavRoutes: Routes = [

  { path: 'browse',
    component: BrowseComponent
  },
  { path: 'shopping-cart',
    component: ShoppingCartComponent
  },
];
