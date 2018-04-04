import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DashBoardServices } from '../../shared/services/dashboard.service';
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
    source: ServerDataSource;
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



    constructor( private dashBoardServices: DashBoardServices) {
    }

    ngOnInit() {
        this.dashBoardServices.getTransactions()
            .subscribe(
                result => {
                    if (result) {
                        console.log(result['id']);
                        // Map everything back to where it can be loaded into the table.
                    }
                },
                error => error.toString());
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
