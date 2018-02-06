import { Injectable }     from '@angular/core';
import { Http, Response,Headers,
        RequestOptions} from '@angular/http';
        import { Observable }    from 'rxjs/Observable';

import {EndPoint}   from '../constants';
import {Utils}  from '../utils.service';
import {User} from './user'

export class RegisterUser{
  constructor(
    public username:string = "",
    public firstname:string = "",
    public lastname:string = "",
    public password:string = "",
    public  email: string = ""
  ){}
  toJson() {
    return {
      username: this.username,
      firstname:this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    }
  }
};
@Injectable()
export class RegisterService{
  constructor(private http:Http){}

  register(user:RegisterUser): Observable<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(EndPoint.REGISTER, user.toJson(), options)
                    .map((data) =>{
                      let json = Utils.extractJson(data);
                      return new User(
                        json.id,
                        json.username,
                        json.firstname,
                        json.lastname,
                        json.email,
                        json.isAdmin
                      )
                    })
                    .catch(Utils.handleError);
  }

}
