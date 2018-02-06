import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture,
} from '@angular/core/testing';

import {SessionService} from './session.service';
import {User}       from './user';

/**
 * Load the implementations that should be tested
 */
describe(`SessionService`, () => {
  const service:SessionService = new SessionService();
  const tokenKey:string = service.tokenKey();
  const userKey:string = service.userKey();
  const TOKEN: string = "Bearer 15a9f0af-ca95-45f6-ab7d-67097e8bdef1";
  const USERNAME:string = "testuser";
  const USER_ID:number = 2;
  const user:User =  new User(USER_ID, USERNAME);

  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      schemas: [NO_ERRORS_SCHEMA],
    });
  }));
  afterEach(async(() => {
    localStorage.clear();
    service.clear();
  }));
  /**
   * Synchronous beforeEach
   */
  beforeEach(() => {
  });
  it(`should initialize with no user, token, and not logged in`, () => {
    expect(service.user()).toBeFalsy();
    expect(service.token()).toBeFalsy();
    expect(service.isLoggedIn()).toBeFalsy();
  });
  it(`should be able to set if logged in`, () => {
    service.setLoggedIn(true);
    expect(service.isLoggedIn()).toBeTruthy();
  });
  it(`should allow setting a user and save it in local storage`, () => {
    service.update(user);
    let u:User = service.user();
    let jsonStr:string = localStorage.getItem(userKey);
    let u2:User = jsonStr ? User.fromJson(jsonStr) : null;
    expect(u).toBeTruthy();
    expect(u2).toBeTruthy();
    expect(u.username).toEqual(USERNAME);
    expect(u.id).toEqual(USER_ID);
    expect(u2.username).toEqual(USERNAME);
    expect(u2.id).toEqual(USER_ID);
  });
  it(`should allow setting the session token and save it in local storage`, () => {
    service.updateToken(TOKEN);
    let t:string = service.token();
    let t2:string = localStorage.getItem(tokenKey);
    expect(t).toEqual(TOKEN);
    expect(t2).toEqual(TOKEN);
  });
  it(`should allow clearing session and token`, () => {
    service.updateToken(TOKEN);
    service.update(user);
    service.clear();
    let u:User = service.user();
    let jsonStr:string = localStorage.getItem(userKey);
    let u2:User = jsonStr ? User.fromJson(jsonStr) : null;
    let t:string = service.token();
    let t2:string = localStorage.getItem(tokenKey);
    expect(t).toEqual(null);
    expect(t2).toEqual(null);
    expect(u).toEqual(null);
    expect(u2).toEqual(null);
    expect(service.isLoggedIn()).toBeFalsy();
  });
  it(`should be able to subscribe to user changes`, () => {
    let onSubscribe: (user:User)=> void;
    onSubscribe = function(user:User){
      expect(user).toBeTruthy();
      expect(user.username).toEqual(USERNAME);
      expect(user.id).toEqual(USER_ID);
    }
    let subscriber = {onSubscribe: onSubscribe}
    spyOn(subscriber, "onSubscribe");
    service.sessionView.subscribe(subscriber.onSubscribe)
    service.update(user);
    expect(subscriber.onSubscribe).toHaveBeenCalled();
  });
  it(`should be able to subscribe to token changes`, () => {
    let onSubscribe: (token:string)=> void;
    onSubscribe = function(token:string){
      expect(token).toBeTruthy();
      expect(token).toEqual(TOKEN);
    }
    let subscriber = {onSubscribe: onSubscribe}
    spyOn(subscriber, "onSubscribe");
    service.tokenView.subscribe(subscriber.onSubscribe)
    service.updateToken(TOKEN);
    expect(subscriber.onSubscribe).toHaveBeenCalled();
  });
});
