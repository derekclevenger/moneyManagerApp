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
import {User} from '../models/user.model';


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

    // Need to fix this to do CRUD
    getTransactions(): Observable<Transactions[]> {
        // let body = JSON.stringify({ id });
        let headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('auth_token')});
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.baseUrl + '/transactions/' + localStorage.getItem('id'), options)
            .map(response => response.json())
            .map(response => {
                return <Transactions[]>response;
            })
            .catch(this.handleError);
    }

    addTransaction(payee: string, transactionDate: Date, amount: number,
                   category: string, accountType: string, userId: string): Observable<Transactions[]> {
        let body = JSON.stringify({payee, transactionDate, amount, category, accountType, userId});
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
        });
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.baseUrl + '/transactions', body, options)
            .map(response => response.json())
            .map(response => {
                return  <Transactions[]>response;
            })
            .catch(this.handleError);
    }

    deleteTransaction(id: number): Observable<Transactions> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
        });
        const options = new RequestOptions({headers: headers});

        return this.http.delete(this.baseUrl + '/transactions/' + id, options)
            .map(res => true)
            .catch(this.handleError);
    }

    updateTransaction(id: number, payee: string, transactionDate: Date, amount: number,
                      category: string, accountType: string, userId: string): Observable<Transactions> {
        let body = JSON.stringify({id, payee, transactionDate, amount, category, accountType, userId});
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
        });
        let options = new RequestOptions({headers: headers});

        return this.http.put(this.baseUrl + '/transactions/' + id, body, options)
            .map(res => true)
            .catch(this.handleError);
    }
}

