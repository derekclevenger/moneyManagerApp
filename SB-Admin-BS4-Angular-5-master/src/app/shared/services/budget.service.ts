import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserRegistration } from '../models/user.registration';
import { ConfigService } from '../utils/config.service';
import {Budget} from '../models/budget.interface';
import {BaseService} from './base.service';
import { Category } from '../models/category.interface';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';
import {User} from '../models/user.model';


@Injectable()

export class BudgetService extends BaseService {

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
    getCategories(): Observable<Category[]> {
        // let body = JSON.stringify({ id });
        let headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('auth_token')});
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.baseUrl + '/category' , options)
            .map(response => response.json())
            .map(response => {
                return <Category[]>response;
            })
            .catch(this.handleError);
    }

    getBudgets(): Observable<Budget[]> {
        // let body = JSON.stringify({ id });
        let headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('auth_token')});
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.baseUrl + '/budget/' + localStorage.getItem('id'), options)
            .map(response => response.json())
            .map(response => {
                return <Budget[]>response;
            })
            .catch(this.handleError);
    }

    addBudget(amount: number, category: string, monthly: boolean, userId: string): Observable<Budget[]> {
        let body = JSON.stringify({amount, category, monthly, userId});
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
        });
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.baseUrl + '/budget', body, options)
            .map(response => response.json())
            .map(response => {
                return  <Budget[]>response;
            })
            .catch(this.handleError);
    }

    deleteBudget(id: number): Observable<Budget> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
        });
        const options = new RequestOptions({headers: headers});

        return this.http.delete(this.baseUrl + '/budget/' + id, options)
            .map(res => true)
            .catch(this.handleError);
    }

    updateBudget(id: number, amount: number, category: string, monthly: boolean, userId: string): Observable<Budget> {
        let body = JSON.stringify({id, amount, category, monthly, userId});
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
        });
        let options = new RequestOptions({headers: headers});

        return this.http.put(this.baseUrl + '/budget/' + id, body, options)
            .map(res => true)
            .catch(this.handleError);
    }
}

