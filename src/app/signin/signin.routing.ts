import { Routes, RouterModule }         from '@angular/router';
import { SignInComponent } from './signin.component';
import {SignInGuard} from '../common/users/signin-guard';

export const SignInRoutes: Routes = [
  { path: 'signin',
    component: SignInComponent,
    canActivate: [SignInGuard]
  }
];
