import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture,
} from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {User} from './user';
import {UserService} from './users.service';

/*
 * Load the implementations that should be tested
 */
 /*
describe(`UsersService`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [UsersService, {provide: XHRBackend, useClass: MockBackend}],
      schemas: [NO_ERRORS_SCHEMA],
    });
  }));
  beforeEach(() => {
  });
  describe(`fetch()`, ()=>{
    it(`should initialize with no user, token, and not logged in`,
      inject([UsersService, XHRBackend], (usersService, mockBackend) => {
    }));
  });

});
*/
