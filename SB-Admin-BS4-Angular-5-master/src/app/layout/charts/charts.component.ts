import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DashBoardServices } from '../../shared/services/dashboard.service';
import { BudgetService } from '../../shared/services/budget.service';
import {Category} from '../../shared/models/category.interface';
import { Budget } from '../../shared/models/budget.interface';
import { Transactions } from '../../shared/models/transactions.interface';
import { Expenditures } from '../../shared/models/expenditure.interface';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
    private date = new Date(new Date().getFullYear(), 0, 1);
    public categories: Category[] = [];
    public budgetToEdit: Budget[] = [];
    public budget: Budget[] = [];
    public expenditures: Expenditures[];
    public newBudgets = false;
    public newCats = false;
    public seeBudgets = true;
    errors: string;
    isRequesting = false;
    badCat = false;
    badBudget = false;
    editBudget = false;


    constructor(private budgetService: BudgetService, private dashboardService: DashBoardServices) {}

    public switchView() {
        this.seeBudgets = !this.seeBudgets;
    }

    public deleteBudget(id: number) {
        if (window.confirm('Are you sure you want to delete?')) {
            this.budgetService.deleteBudget(id)
                .subscribe(
                    result  => {if (result) {
                        this.getBudget();
                    }},
                    errors =>  this.errors = errors);
         }
    }

    public updateBudget(id: number) {
        this.budgetService.getSingleBudget(id)
            .finally(() => this.isRequesting = false)
            .subscribe(
                result  => {if (result) {
                    this.budgetToEdit = result;
                    this.editBudget = true;
                }},
                errors =>  this.errors = errors);
    }

    public updateFullBudget({ value }: { value: Budget}) {
        this.budgetService.updateBudget(this.budgetToEdit[0].id, value.amount, value.category, value.monthly, localStorage.getItem('id'))
            .finally(() => this.isRequesting = false)
            .subscribe(
                result  => {if (result) {
                    this.getBudget();
                    this.editBudget = false;
                }},
                errors =>  this.errors = errors);
    }

    public newCat() {
        this.newCats = true;
    }

    public  newBudget() {
        this.newBudgets = true;
    }

    public cancel() {
            this.editBudget = false;
            this.newBudgets = false;
            this.newCats = false;
    }

    public addBudgets({ value }: { value: Budget}) {
        this.isRequesting = true;
        this.errors = '';
        for (let i = 0; i < this.budget.length; i++) {
            if (value.category.toLocaleLowerCase() === this.budget[i].category.toLocaleLowerCase()) {
                this.badBudget = true;
                return false;
            }
        }
            this.budgetService.addBudget(value.amount, value.category, value.monthly, localStorage.getItem('id'))
                .finally(() => this.isRequesting = false)
                .subscribe(
                    result  => {if (result) {
                         this.getBudget();
                         this.badBudget = false;
                         this.newBudgets = false;
                    }},
                    errors =>  this.errors = errors);
    }

    // TODO add modal to add category and EDIT everything
    public addCategory({ value }: { value: Category}) {
        this.isRequesting = true;
        this.errors = '';
        for (let i = 0; i < this.categories.length; i++) {
            if (value.category.toLocaleLowerCase() === this.categories[i].category.toLocaleLowerCase()) {
                this.badCat = true;
                return false;
            }
        }
        this.budgetService.addCategory(value.category)
            .finally(() => this.isRequesting = false)
            .subscribe(
                result  => {if (result) {
                    this.badCat = false;
                    this.newCats = false;
                    this.getCategory();
                }},
                errors =>  this.errors = errors);
    }

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

    public getBudget() {
        this.budgetService.getBudgets()
            .subscribe(
                result => {
                    if (result) {
                        this.budget = result;
                    }
                },
                error => error.toString());
    }

    public getExpenditures() {
        this.budgetService.getExpenditures()
            .subscribe(
                result => {
                    if (result) {
                       this.expenditures = result;
                    }
                },
                error => error.toString());
    }


    ngOnInit() {
        this.getCategory();
        this.getBudget();
        this.getExpenditures();
    }

}
