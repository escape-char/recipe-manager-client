import { Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';

import {ToggleState, MainToggleService}  from '../common/main-toggle.service';
import {DeviceService} from '../common/device.service';
import {SessionService} from '../common/users/session.service';
import {MyCategoriesResolver} from '../myrecipes/my-categories-resolver.service';
import {ModalService, ModalView} from '../common/widgets/modal/modal.service';
import {RecipeModalComponent} from '../common/recipes/recipe-modal.component';

@Component({
  selector: 'main-nav',
  templateUrl: './mainnav.html',
  styleUrls: ['./mainnav.scss'],
  animations: [
    trigger('toggleState', [
       state('Hidden', style({
        display:"none",
         height:0,
         paddingTop: 0,
         transform: 'translateY(-100%)',
       })),
       state('Visible', style({
           visibility: 'visible',
           opacity: 1,
           transform: 'translateY(0%)',
      })),
      transition('Hidden => Visible', [
        animate('300ms ease-in')
      ]),
      transition('Visible => Hidden', [
        animate('300ms  ease-in')
      ])
    ])
  ],
})
export class MainNavComponent {
  message: string;
  navState:string = ToggleState.Hidden;
  isLoggedIn:boolean = false;

  constructor(public router: Router,
              private mainToggleService: MainToggleService,
              private modalService: ModalService,
              private deviceService: DeviceService,
              private sessionService: SessionService) {

      this.isLoggedIn = this.sessionService.isLoggedIn();

      this.sessionService.sessionView.subscribe(
        (data:any) =>{
          this.isLoggedIn = this.sessionService.isLoggedIn();
        },
        (error:any) =>{
          this.isLoggedIn = this.sessionService.isLoggedIn();
        }
      )
      mainToggleService.stateView.subscribe(
          (state:string) =>{
            console.log("state changed");
            console.log(state);
            this.navState = state;
          },
          (error) =>{
          }
        )
      if(!this.deviceService.isMobile()){
        mainToggleService.setState(ToggleState.Visible);
      }else{
        this.router.events.subscribe((v) => {
            this.mainToggleService.setState(ToggleState.Hidden);
        })
      }
   }
   onAddRecipeClicked(){
     console.log("onAddRecipeClicked()");
     if(this.deviceService.isMobile()){
       this.mainToggleService.setState(ToggleState.Hidden);
     }
     let view:ModalView = this.modalService.create(RecipeModalComponent, null,
              [{provide: "Recipe", useValue: null}, {provide:"RECIPE_ACTION", useValue:"new"}]);
     this.modalService.open(view.id);
   }

}
