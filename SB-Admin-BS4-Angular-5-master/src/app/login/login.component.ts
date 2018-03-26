import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { routerTransition } from '../router.animations';

import { Subscription } from 'rxjs/Subscription';
import { Credentials } from '../shared/models/credentials.interface';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';
import { HeaderComponent } from '../layout/components/header/header.component';

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
    _user: User[];
    headerComponent: HeaderComponent;
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


    login({ value, valid }: { value: Credentials, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.getLoginUser(value);
            this.userService.login(value.email, value.password)
                .finally(() => this.isRequesting = false)
                .subscribe(
                    result => {
                        if (result) {
                            this.onLoggedin();
                            this.router.navigate(['/dashboard']);
                        }
                    },
                    error => this.errors = error.toString());
        }
    }

    getLoginUser(value: Credentials): void {
        this.userService.getUser(value.email, value.password)
            .subscribe(
                result => {
                    localStorage.setItem('id', result['id']);
                    localStorage.setItem('firstName', result['firstName']);
                    localStorage.setItem('lastName', result['lastName']);
                    localStorage.setItem('email', result['email']);
                } ,
                error => console.log('Error :: ' + error)
            );
    }
}
