import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserRegistration } from '../models/user.registration';
import { ConfigService } from '../utils/config.service';
import { Transactions } from '../models/transactions.interface';
import {BaseService} from './base.service';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';


@Injectable()

export class DashBoardServices extends BaseService {

    baseUrl: string = '';
    // Observable navItem source
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    // Observable navItem stream
    authNavStatus$ = this._authNavStatusSource.asObservable();
    private loggedIn = false;

    constructor(private http: Http, private configService: ConfigService) {
        super();
        this.loggedIn = !!localStorage.getItem('auth_token');
        this._authNavStatusSource.next(this.loggedIn);
        this.baseUrl = configService.getApiURI();
    }

    // FIX for the right url then update it so that it is called by the dashboard

    getTransactions(): Observable<Transactions[]> {
        // let body = JSON.stringify({ id });
        let headers = new Headers({ 'Content-Type': 'application/json' , 'Authorization' : 'bearer ' + localStorage.getItem('auth_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.baseUrl + '/transactions/' + localStorage.getItem('id'), options)
            .map(res => true)
            .catch(this.handleError);
    }



}

