import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Transactions } from '../../shared/models/transactions.interface';
import {Category} from '../../shared/models/category.interface';
import { DashBoardServices } from '../../shared/services/dashboard.service';
import { BudgetService } from '../../shared/services/budget.service';
import {UserRegistration} from '../../shared/models/user.registration';
import {Filter} from '../../shared/models/filter.interface';


@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    public transactions: Transactions[] = [];
    public categories: Category [] = [];
    public filter = false;

    constructor(private budgetService: BudgetService, private dashboardService: DashBoardServices) {}

    public getCategory() {
        this.budgetService.getCategories()
            .subscribe(
                result => {
                    if (result) {
                        this.categories = result;
                    }
                },
                error => error.toString());
    }

    public getUserTransactions() {
        this.dashboardService.getTransactions()
            .subscribe(
                result => {
                    if (result) {
                        this.transactions = result;
                    }
                },
                error => error.toString());
    }

    public cancel() {
        this.filter = false;
    }

    public filterView() {
        this.filter = true;
    }

    public filterExpenditures({ value}: { value: Filter}) {
        this.transactions = [];
        this.dashboardService.getTransactions()
            .subscribe(
                result => {
                    if (result) {
                        for (let i = 0; i < result.length; i++) {
                            if (value.category !== null && value.startDate.toString() !== null && value.endDate.toString() !== null) {
                                if (result[i].category === value.category && result[i].transactionDate > value.startDate &&
                                    result[i].transactionDate < value.endDate) {
                                    this.transactions.push(result[i]);
                                }
                            }
                            if (value.category !== null && value.startDate.toString() !== null && value.endDate.toString() === '') {
                                if (result[i].category === value.category && result[i].transactionDate > value.startDate) {
                                    this.transactions.push(result[i]);
                                }
                            }
                            if (value.category !== null && value.startDate.toString() === null && value.endDate.toString() !== null) {
                                if (result[i].category === value.category && result[i].transactionDate < value.endDate) {
                                    this.transactions.push(result[i]);
                                }
                            }
                            if (value.category === '' && value.startDate.toString() !== null && value.endDate.toString() !== null) {
                                if (result[i].transactionDate > value.startDate && result[i].transactionDate < value.endDate) {
                                    this.transactions.push(result[i]);
                                }
                            }
                            if (value.category !== null && value.startDate.toString() === null && value.endDate.toString() === null) {
                                if ( result[i].category === value.category) {
                                    this.transactions.push(result[i]);
                                }
                            }
                        }
                        // need to add a check to make sure that it wasn't a bad request or nothing in it
                            if (value.category ===  '' && value.startDate.toString() === '' && value.endDate.toString() === '') {
                                this.transactions = result;

                            }
                        this.filter = false;
                    }
                },
                error => error.toString());
    }

    ngOnInit() {
        this.getCategory();
        this.getUserTransactions();
    }
}
