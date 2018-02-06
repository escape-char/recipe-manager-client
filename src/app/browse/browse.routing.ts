import { Routes }         from '@angular/router';
import { BrowseComponent } from '../browse/browse.component';
import {LoginGuard} from '../common/users/login-guard';

export const BrowseRoutes: Routes = [
  { path: 'browse',
    component: BrowseComponent
  }
];
