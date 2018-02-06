import { Injectable }     from '@angular/core';
import { Http, Response,Headers,
        RequestOptions} from '@angular/http';
import { Observable }    from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import {EndPoint}   from '../constants';
import {Utils}  from '../utils.service';
import {AuthHttp} from './auth-http';
import {User} from '../users/user';

@Injectable()
export class AuthService{
  private _isLoggedInSource = new Subject<Boolean>();
  public isLoggedIn = this._isLoggedInSource.asObservable;

  private token:string = "";

  constructor(private http:AuthHttp){}

  auth(username:string, password:string): Observable<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(EndPoint.AUTH, JSON.stringify({username:username, password:password}), options)
                    .map(function(resp){
                      let json = JSON.stringify(Utils.extractJson(resp).user);
                      return User.fromJson(json);
                    })
                    .catch(Utils.handleError);
  }
  signout() {
    return this.http.post(EndPoint.SIGNOUT, "{}")
                    .map(Utils.extractJson)
                    .catch(Utils.handleError);
  }
}
