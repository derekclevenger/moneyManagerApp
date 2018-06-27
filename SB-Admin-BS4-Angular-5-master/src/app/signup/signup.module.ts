import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmailValidatorDirective } from '../directives/email.validator.directive';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {UserService} from '../shared/services/user.service';
import {SharedModule} from '../shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
      CommonModule,
      SharedModule,
      FormsModule
  ],
  declarations: [SignupComponent, EmailValidatorDirective],
    providers: [UserService]
})
export class SignupModule { }
