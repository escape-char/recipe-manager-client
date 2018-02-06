import {Http, Request, RequestOptionsArgs, Response, XHRBackend,
   RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import {SessionService} from '../users/session.service';

export class AuthHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _router: Router,
        private sessionService:SessionService) {
        super(backend, defaultOptions);
    }
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        console.log("making request");
        console.log(options)
        return this.intercept(super.request(url, options));
    }
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
          console.log("making GET request");
        return this.intercept(super.get(url,this.getRequestOptionArgs(options)));
    }
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
      console.log("making POST request");

        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    }
    getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        console.log("getRequestOptionArgs");
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        console.log("appending token: " + this.sessionService.token());
        options.headers.append('Authorization', this.sessionService.token())
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
      console.log("intercepting request");
      console.log(observable);
      return observable.do((resp)=>{
        console.log("observable.do");
        if(resp.url.endsWith("/api/auth")){
          console.log("setting user as logged in")
          this.sessionService.updateToken(resp.headers.get("Authorization"))
          this.sessionService.setLoggedIn(true);
        }
        else if(resp.url.endsWith("/api/signout")){
          console.log("clearing session service");
          this.sessionService.clear();
          this._router.navigateByUrl('/signin');

        }
      }).catch((response, source) => {
            if (response.status  == 401 &&
               !_.endsWith(response.url, 'api/auth')) {
                this.sessionService.clear();
                this._router.navigateByUrl('/signin');
                return Observable.empty();
            } else {
                return Observable.throw(response);
            }
        });

    }
}
