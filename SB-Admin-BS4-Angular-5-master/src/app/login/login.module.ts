import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../shared/services/user.service';
import {SharedModule} from '../shared/modules/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {SignupRoutingModule} from '../signup/signup-routing.module';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        SharedModule,
        FormsModule
    ],
    declarations: [LoginComponent],
    providers: [ UserService ]
})
export class LoginModule {}

