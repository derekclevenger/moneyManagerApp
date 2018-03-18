import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { routerTransition } from '../router.animations';

import { Subscription } from 'rxjs/Subscription';
import { Credentials } from '../shared/models/credentials.interface';
import { UserService } from '../shared/services/user.service';
import { UserRegistration } from '../shared/models/user.registration.interface';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit, OnDestroy {
    public HomePage: String = 'My Money Manager Application';

    private subscription: Subscription;

    brandNew: boolean;
    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;
    credentials: Credentials = { email: '', password: '' };
    user: UserRegistration = { firstName: '', lastName: '' , email: '', password: ''};

    constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                this.brandNew = param['brandNew'];
                this.credentials.email = param['email'];
            });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

    loggedIn(returnedUser: any) {
        this.user.firstName = returnedUser['firstName'];
        this.user.lastName = returnedUser['lastName'];
        this.user.email = returnedUser['email'];
    }

    login({ value, valid }: { value: Credentials, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.userService.login(value.email, value.password)
                .finally(() => this.isRequesting = false)
                .subscribe(
                    result => {
                        if (result) {
                            this.onLoggedin();
                            this.router.navigate(['/dashboard']);
                        }
                    },
                    error => this.errors = error);
        }
    }
}
