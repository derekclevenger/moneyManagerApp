import { SignupModule } from './signup.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('SignupModule', () => {
  let signupModule: SignupModule;

  beforeEach(() => {
    signupModule = new SignupModule();
  });

  it('should create an instance', () => {
    expect(signupModule).toBeTruthy();
  });
});
