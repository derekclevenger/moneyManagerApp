import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DashBoardServices } from '../../shared/services/dashboard.service';
import { ServerDataSource } from 'ng2-smart-table';
import {Transactions} from '../../shared/models/transactions.interface';
import {Headers, Http, RequestOptions} from '@angular/http';
import {API_URL} from '../../constants';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public transactions: Transactions[];
    source: ServerDataSource;
    settings = {
        columns: {
            payee: {
                title: 'Payee/Payer'
            },
            transactionDate: {
                title: 'Transaction Date'
            },
            amount: {
                title: 'Amount'
            },
            category: {
                title: 'Category'
            }
        }
    };



    constructor( private dashBoardServices: DashBoardServices) {
    }

    ngOnInit() {
        this.dashBoardServices.getTransactions()
            .subscribe(
                result => {
                    if (result) {
                        this.transactions = result;
                        }
                },
                error => error.toString());
    }

}
