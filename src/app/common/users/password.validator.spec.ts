import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture,
} from '@angular/core/testing';

import { FormControl, Validators } from '@angular/forms';
import {PasswordValidator} from './password.validator';

/**
 * Load the implementations that should be tested
 */

describe(`PasswordValidator`, () => {
  const invalid1:string = "simplepassword";
  const valid:string = "Testing1!"
  const noMatch:string = "Testing1!2"
  const password1Ctrl:FormControl = new FormControl(invalid1, Validators.required)
  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      schemas: [NO_ERRORS_SCHEMA],
    });
  }));

  /**
   * Synchronous beforeEach
   */
  beforeEach(() => {
  });

  it(`should not allow non-complex passwords`, () => {
    const result:any = PasswordValidator.checkComplexity(password1Ctrl) || {};
    const hasError:boolean = "validatePassword" in result ? result.validatePassword : false;
    expect(hasError).toBe(true);
  });
  it(`should allow complex passwords`, () => {
    password1Ctrl.setValue(valid)
    const result:any = PasswordValidator.checkComplexity(password1Ctrl) || {};
    const hasError:boolean = "validatePassword" in result ? result.validatePassword : false;
    expect(hasError).toBe(false);
  });

});
