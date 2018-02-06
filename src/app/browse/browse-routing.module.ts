import { NgModule }       from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { CommonModule }   from '@angular/common';
import {SharedModule} from '../common/shared.module';
import { BrowseComponent } from './browse.component';
import {BrowseRoutes} from './browse.routing';
import {BrowseChoicesComponent } from './browse-choices.component';
import {BrowseOnlineComponent } from './browse-online.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(BrowseRoutes),
    SharedModule
  ],
  declarations: [
    BrowseComponent,
    BrowseChoicesComponent,
    BrowseOnlineComponent
  ],
  exports:[
    RouterModule,
    BrowseComponent,
    BrowseChoicesComponent,
    BrowseOnlineComponent
  ],
  providers: [
  ]
})
export class BrowseRoutingModule { }
