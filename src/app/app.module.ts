import { NgModule } from '@angular/core';
import {Router} from '@angular/router';
import { HttpModule,Http, RequestOptions, XHRBackend  } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//main app component
import { AppComponent } from './app.component';
import {AppRouting} from './app.routing';
import {SharedModule} from './common/shared.module';

//services
import {MainToggleService} from './common/main-toggle.service'
import {ModalService} from './common/widgets/modal/modal.service';
import {SessionService}  from './common/users/session.service';
import {UsersService} from './common/users/users.service';
import {DeviceService} from './common/device.service';
import {CategoriesService} from './common/categories/categories.service';
import {RecipesService} from './common/recipes/recipes.service';

//main nav
import {MainNavModule} from './mainnav/mainnav.module';

//main header
import {MainHeaderModule} from './mainheader/main-header.module';
//my recipes, browsing, categoring, shopping cart
import {BrowseRoutingModule} from './browse/browse-routing.module';

import {ShoppingCartComponent} from './shoppingcart/shoppingcart.component';
import {SignInRoutingModule} from './signin/signin-routing.module';

//guards
import {AuthHttp} from './common/security/auth-http';
import {LoginGuard} from './common/users/login-guard';
import {SignInGuard} from './common/users/signin-guard';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouting,
    SharedModule,
    BrowseRoutingModule,
    SignInRoutingModule,
    MainHeaderModule,
    MainNavModule
  ],
  declarations: [
    AppComponent,
    ShoppingCartComponent
  ],
  entryComponents:[
  ],
  providers: [ModalService,
              CategoriesService,
              RecipesService,
              SessionService,
              MainToggleService,
              UsersService,
              SignInGuard,
              LoginGuard,
              DeviceService,
              {
                provide: AuthHttp,
                useFactory: (backend: XHRBackend, options: RequestOptions, router:Router,
                             sessionService:SessionService) => {
                  return new AuthHttp(backend, options, router, sessionService);
                },
                deps: [XHRBackend, RequestOptions,  Router, SessionService]
            }
            ],
  bootstrap: [ AppComponent]
})
export class AppModule { }
