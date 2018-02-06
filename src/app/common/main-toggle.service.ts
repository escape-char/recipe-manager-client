import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }   from 'rxjs/Subject';

export class ToggleState{
  static Hidden = "Hidden";
  static Visible = "Visible";
}
@Injectable()
export class MainToggleService{
  private _stateSource = new Subject<string>();
  public stateView = this._stateSource.asObservable();

  constructor(){
    this._stateSource.next("Hidden");
  }
  setState(s:string){
    this._stateSource.next(s);
  }
}
