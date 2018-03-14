import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import 'rxjs/add/operator/map';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { UserRegistration } from '../shared/models/user.registration.interface';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})


export class SignupComponent implements OnInit {
    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;


    constructor( private router: Router, private userService: UserService) {
    }
    ngOnInit() {
    }

    registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.userService.register(value.email, value.password, value.firstName, value.lastName)
                .finally(() => this.isRequesting = false)
                .subscribe(
                    result  => {if (result) {
                        this.router.navigate(['/login'], { queryParams: {brandNew: true, email: value.email}});
                    }},
                    errors =>  this.errors = errors);
        }
    }
}
