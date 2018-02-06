import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';
import { SignIn }    from './signin';
import {ModalService} from '../common/widgets/modal/modal.service';
import {AuthService}  from '../common/security/auth.service';
import {SessionService} from '../common/users/session.service';
import {User} from '../common/users/user';
import {Utils} from '../common/utils.service';

@Component({
  selector: 'signin-form',
  templateUrl: 'signin-form.html',
  providers: [AuthService]
})
export class SignInFormComponent {
  model = new SignIn("", "");
  submitted = false;
  error:string = "";
  @Input() modalId:string;

  constructor(private modalService:ModalService,
              private authService: AuthService,
              private sessionService:SessionService,
              private router: Router ){

  }
  onSubmit() {
    console.log("onSubmit()")
    this.submitted = true;
    this.authService.auth(this.model.username,
                              this.model.password).subscribe(
      (data:User) => {
        this.error = "";
        this.modalService.close(this.modalId);
        this.sessionService.update(data);
        this.router.navigateByUrl('/my-recipes');
      },
      (data:any) =>{
        this.error = data;
      }
    );
    return false;
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
