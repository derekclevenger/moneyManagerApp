import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ServerDataSource } from 'ng2-smart-table';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    settings = {
        columns: {
            payee: {
                title: 'Payee/Payer'
            },
            date: {
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



    constructor() {
    }

    ngOnInit() {}

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
