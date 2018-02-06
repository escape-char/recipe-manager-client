import { Injectable }     from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable }    from 'rxjs/Observable';
import {User}       from './user';

@Injectable()
export class SessionService{
  private _TOKEN_KEY:string = "current-user-token";
  private _USER_KEY:string = "current-user";
  private _sessionSource = new Subject<User>();

  private currentUser:User;
  private _token:string;

  public sessionView = this._sessionSource.asObservable();
  public _tokenSource = new Subject<string>();
  public tokenView = this._tokenSource.asObservable();

  private loggedIn: boolean = false;

  constructor(){
    let userJson:string = localStorage.getItem(this._USER_KEY);
    this._token  = localStorage.getItem(this._TOKEN_KEY) || undefined;
    if(userJson){
      this.currentUser = User.fromJson(userJson);
      this._sessionSource.next(this.currentUser);
    }
    if(this._token){
      this._tokenSource.next(this._token);
    }
    if(this._token && userJson){
      this.loggedIn = true;
    }
  }
  public userKey():string {
    return this._USER_KEY;
  }
  public tokenKey():string{
    return this._TOKEN_KEY;
  }
  public user(){
    return this.currentUser;
  }
  public clear(){
    this.loggedIn = false;
    this.currentUser = null;
    localStorage.removeItem(this._TOKEN_KEY);
    localStorage.removeItem(this._USER_KEY);
    this._tokenSource.next(null);
    this._token=null;
    this._sessionSource.next(null)
  }
  public token(){
    return this._token;
  }
  public update(user:User){
    this.currentUser = user;
    this._sessionSource.next(user);
    localStorage.setItem(this._USER_KEY, JSON.stringify(user.toJson()));
  }
  public updateToken(token:string){
    this._token = token;
    this._tokenSource.next(this._token);
    localStorage.setItem(this._TOKEN_KEY,  this._token);
  }
  public isLoggedIn():boolean{
    return this.loggedIn;
  }
  public setLoggedIn(l:boolean){
    this.loggedIn = l;
  }
}
