import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DashBoardServices } from '../../shared/services/dashboard.service';
import { ServerDataSource } from 'ng2-smart-table';
import {Transactions} from '../../shared/models/transactions.interface';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import {CurrencyPipe, DatePipe} from '@angular/common';
import { DecimalPipe } from '@angular/common';


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
    errors: string;
    dateNow: Date = new Date();
    settings = {
        delete: {
            confirmDelete: true,
        },
        add: {
            confirmCreate: true,
            id: false
        },
        edit: {
            confirmSave: true,
        },
        columns: {
            id: {
                addable: false,
                filter: false,
                editable: false,
                title: 'Id'
            },
            payee: {
                title: 'Payee/Payer',
            },
            transactionDate: {
                title: 'mm-dd-yyyy',
                inputAttributes: {
                    type: 'html',
                    editor: {
                        type: 'date'
                    }
                }
            },
            amount: {
                title: 'Amount'
            },
            category: {
                title: 'Category'
            },
            accountType: {
                title: 'Account Type',
                type: 'html',
                editor: {
                      type: 'list',
                  config: {
                        list: [{value: 'Credit', title: 'Credit'}, {value: 'Debit', title: 'Debit'}, {
                            value: '<b>Checking</b>',
                            title: 'Checking',
                        }],
                    }
                }
            }
        }
    }



    constructor( private dashBoardServices: DashBoardServices, private datePipe: DatePipe, private currencyPipe: CurrencyPipe) {
    }

    ngOnInit() {
        this.dashBoardServices.getTransactions()
            .subscribe(
                result => {
                    if (result) {
                        for (let i = 0; i < result.length; i++) {
                          result[i].transactionDate = this.datePipe.transform(new Date(result[i].transactionDate), 'dd-MM-yyyy');
                            result[i].amount = this.currencyPipe.transform(result[i].amount, 'USD');

                        }
                        this.transactions = result;
                        }
                },
                error => error.toString());
    }

    onDeleteConfirm(event) {
        if (window.confirm('Are you sure you want to delete?')) {
            this.dashBoardServices.deleteTransaction(event.data['id'])
                .subscribe(
                    result  => {if (result) {
                        event.confirm.resolve();
                    }},
                    errors =>  this.errors = errors);
        } else {
            event.confirm.reject();
        }
    }

    onSaveConfirm(event) {
        if (window.confirm('Are you sure you want to save?')) {
            this.dashBoardServices.updateTransaction(event.data['id'], event.newData['payee'], event.newData['transactionDate'],
                event.newData['amount'], event.newData['category'], event.newData['accountType'], localStorage.getItem('id'))
                .subscribe(
                    result  => {if (result) {
                        event.confirm.resolve(event.newData);
                    }},
                    errors =>  this.errors = errors);
        } else {
            event.confirm.reject();
        }
    }

    onCreateConfirm(event) {
        if (window.confirm('Are you sure you want to create?')) {
            this.dashBoardServices.addTransaction(event.newData['payee'], event.newData['transactionDate'], event.newData['amount'],
               event.newData['category'], event.newData['accountType'], localStorage.getItem('id'))
                .subscribe(
                    result  => {if (result) {
                        event.newData['id'] = result['id'];
                        event.newData['amount'] = this.currencyPipe.transform(event.newData['amount'], 'USD');
                        event.confirm.resolve(event.newData);
                    }},
                    errors =>  this.errors = errors);
        } else {
            event.confirm.reject();
        }
    }

}
