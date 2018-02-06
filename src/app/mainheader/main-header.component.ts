import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';

import {ToggleState, MainToggleService} from '../common/main-toggle.service';
import {SessionService} from '../common/users/session.service';
import {User} from '../common/users/user';
import {DropdownMenuDirective} from '../common/widgets/dropdown-menu.directive';
import {AuthService} from '../common/security/auth.service';


@Component({
  selector: 'main-header',
  templateUrl: './main-header.html',
  styleUrls: ['./main-header.scss'],
  providers: [AuthService]

})
export class MainHeaderComponent {
  message: string;
  mainToggleState:string= ToggleState.Hidden;
  user:User;
  isLoggedIn:boolean = false;
  constructor(public router: Router,
            private mainToggleService: MainToggleService,
            private sessionService: SessionService,
            private authService: AuthService) {
    console.log("main header constructor");
    this.user = this.sessionService.user();
    this.isLoggedIn = this.sessionService.isLoggedIn();

    mainToggleService.stateView.subscribe(
      (state:string) =>{
        this.mainToggleState = state;
        this.isLoggedIn = sessionService.isLoggedIn();
      },
      (error) =>{
        this.isLoggedIn = sessionService.isLoggedIn();

      }
    )
    sessionService.sessionView.subscribe(
      (user:User) =>{
        console.log("updating user in main header");
        this.user = user;
        this.isLoggedIn = sessionService.isLoggedIn();

      },
      (error) =>{
        console.log('error via session subscribe');
        this.isLoggedIn = sessionService.isLoggedIn();

      }
    )
   }
   onLogoutClicked(){
     console.log("onLogoutClicked");
     this.authService.signout().subscribe(
       (data:any) =>{

       },
       (error:any) =>{

       }
     )
   }
   onMainToggleClicked(){
     console.log("onMainToggleClicked()");
     if(!this.sessionService.isLoggedIn()){
       return;
     }
     if(this.mainToggleState == ToggleState.Hidden){
       this.mainToggleState = ToggleState.Visible;
     }else{
       this.mainToggleState = ToggleState.Hidden;
     }
     this.mainToggleService.setState(this.mainToggleState);

   }
}
