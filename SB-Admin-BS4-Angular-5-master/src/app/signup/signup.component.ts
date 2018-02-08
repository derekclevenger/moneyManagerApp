import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    LoginComponent;
    constructor() {}

    ngOnInit() {}
}
