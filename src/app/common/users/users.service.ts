import { Injectable }     from '@angular/core';
import { Http, Response,Headers,
        RequestOptions,
        URLSearchParams} from '@angular/http';
import { Subject }    from 'rxjs/Subject';
import { Observable }    from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import {EndPoint}   from '../constants';
import {Utils}  from '../utils.service';
import {User} from './user';

@Injectable()
export class UsersService{
  private usernameTimeout:number;
  private emailTimeout:number;
  constructor(private http:Http){}
  private _usersSource = new Subject<User[]>();
  private usersView = this._usersSource.asObservable();

  isUsernameTaken(username:string): Observable<Boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params:URLSearchParams = new URLSearchParams();
    params.set("username",  username)
    let options = new RequestOptions({ headers: headers, search: params});
    return this.http.get(EndPoint.IS_USERNAME_TAKEN, options)
                    .map(Utils.extractJson)
                    .catch(Utils.handleError);
  }
  isEmailTaken(email:string): Observable<Boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params:URLSearchParams = new URLSearchParams();
    params.set("email",  email)
    let options = new RequestOptions({ headers: headers, search: params});
    return this.http.get(EndPoint.IS_EMAIL_TAKEN, options)
                    .map(Utils.extractJson)
                    .catch(Utils.handleError);
  }
  validateUsernameTaken(control: FormControl){
    window.clearTimeout(this.usernameTimeout);
    let username:string = control.value;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return new Promise((resolve, reject) => {
      if(!username.length){
        resolve(null)
        return
      }
      this.usernameTimeout = window.setTimeout(()=>{
         this.isUsernameTaken(username).subscribe(
                      (data:any) =>{
                        resolve(data.isTaken ? {available:true}: null)
                      },
                      (error:any) =>{
                        reject({available: true})
                      }
                    );
       }, 600);
     });
  }
  validateEmailTaken(control: FormControl){
    window.clearTimeout(this.emailTimeout);
    let email:string = control.value;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return new Promise((resolve, reject) => {
      if(!email.length){
        resolve(null);
        return;
      }
      this.emailTimeout = window.setTimeout(()=>{
         this.isEmailTaken(email).subscribe(
                      (data:any) =>{
                        resolve(data.isTaken ? {available:true}: null)
                      },
                      (error:any) =>{
                        reject({available: true})
                      }
                    );
       }, 600);
     });
  }
  fetch(): Observable<User[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(EndPoint.USERS, options)
                    .map(data => {
                      let json= Utils.extractJson(data);
                      let users:User[] = json.map((data:any) => {
                        return this.toUser(data);
                      });
                      this._usersSource.next(users);
                      return users;
                    })
                    .catch(Utils.handleError);
  }
  toUser(data:any){
    return new User(data.id,
                    data.username,
                    data.firstname,
                    data.lastname,
                    data.email,
                    data.isAdmin);
  }
}
