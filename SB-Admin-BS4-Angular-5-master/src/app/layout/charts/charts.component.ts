import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DashBoardServices } from '../../shared/services/dashboard.service';
import { ServerDataSource } from 'ng2-smart-table';
import { BudgetService } from '../../shared/services/budget.service';
import {Category} from '../../shared/models/category.interface';
import { Budget } from '../../shared/models/budget.interface';
import {UserRegistration} from '../../shared/models/user.registration';
import {NgModel} from '@angular/forms';
import {Router} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import { ModalComponent } from '../bs-component/components';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
    public categories: Category[];
    source: ServerDataSource;
    errors: string;
    dateNow: Date = new Date();
    isRequesting = false;
    public budget: Budget[];
    badCat = false;
    badBudget = false;
    editBudget = false;
    public budgetToEdit: Budget[];

    constructor(private budgetService: BudgetService) {}

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

    public cancel() {
        this.editBudget = false;
    }
    //
    // onSaveConfirm(event) {
    //     if (window.confirm('Are you sure you want to save?')) {
    //         event.newData['amount'] = event.newData['amount'].replace('$', '');
    //         event.newData['amount'] = parseFloat(event.newData['amount']);
    //         this.dashBoardServices.updateTransaction(event.data['id'], event.newData['payee'], event.newData['transactionDate'],
    //             event.newData['amount'], event.newData['category'], event.newData['accountType'], localStorage.getItem('id'))
    //             .subscribe(
    //                 result  => {if (result) {
    //                     event.newData['amount'] = this.currencyPipe.transform(event.newData['amount'], 'USD');
    //                     event.confirm.resolve(event.newData);
    //                 }},
    //                 errors =>  this.errors = errors);
    //     } else {
    //         event.confirm.reject();
    //     }
    // }
    //
    // onCreateConfirm(event) {
    //     if (window.confirm('Are you sure you want to create?')) {
    //         this.dashBoardServices.addTransaction(event.newData['payee'], event.newData['transactionDate'], event.newData['amount'],
    //             event.newData['category'], event.newData['accountType'], localStorage.getItem('id'))
    //             .subscribe(
    //                 result  => {if (result) {
    //                     event.newData['id'] = result['id'];
    //                     event.newData['transactionDate']= this.datePipe.transform(new Date(event.newData['transactionDate']), 'MM-dd-yyyy');
    //                     event.newData['amount'] = this.currencyPipe.transform(event.newData['amount'], 'USD');
    //                     event.confirm.resolve(event.newData);
    //                 }},
    //                 errors =>  this.errors = errors);
    //     } else {
    //         event.confirm.reject();
    //     }
    // }

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
                        console.log(this.budget);
                    }
                },
                error => error.toString());
    }

    ngOnInit() {
        this.getCategory();
        this.getBudget();
    }

    // // bar chart
    // public barChartOptions: any = {
    //     scaleShowVerticalLines: false,
    //     responsive: true
    // };
    // public barChartLabels: string[] = [
    //     '2006',
    //     '2007',
    //     '2008',
    //     '2009',
    //     '2010',
    //     '2011',
    //     '2012'
    // ];
    // public barChartType: string = 'bar';
    // public barChartLegend: boolean = true;
    //
    // public barChartData: any[] = [
    //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    // ];
    //
    // // Doughnut
    // public doughnutChartLabels: string[] = [
    //     'Download Sales',
    //     'In-Store Sales',
    //     'Mail-Order Sales'
    // ];
    // public doughnutChartData: number[] = [350, 450, 100];
    // public doughnutChartType: string = 'doughnut';
    //
    // // Radar
    // public radarChartLabels: string[] = [
    //     'Eating',
    //     'Drinking',
    //     'Sleeping',
    //     'Designing',
    //     'Coding',
    //     'Cycling',
    //     'Running'
    // ];
    // public radarChartData: any = [
    //     { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    //     { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
    // ];
    // public radarChartType: string = 'radar';
    //
    // // Pie
    // public pieChartLabels: string[] = [
    //     'Download Sales',
    //     'In-Store Sales',
    //     'Mail Sales'
    // ];
    // public pieChartData: number[] = [300, 500, 100];
    // public pieChartType: string = 'pie';
    //
    // // PolarArea
    // public polarAreaChartLabels: string[] = [
    //     'Download Sales',
    //     'In-Store Sales',
    //     'Mail Sales',
    //     'Telesales',
    //     'Corporate Sales'
    // ];
    // public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
    // public polarAreaLegend: boolean = true;
    //
    // public polarAreaChartType: string = 'polarArea';
    //
    // // lineChart
    // public lineChartData: Array<any> = [
    //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    //     { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    // ];
    // public lineChartLabels: Array<any> = [
    //     'January',
    //     'February',
    //     'March',
    //     'April',
    //     'May',
    //     'June',
    //     'July'
    // ];
    // public lineChartOptions: any = {
    //     responsive: true
    // };
    // public lineChartColors: Array<any> = [
    //     {
    //         // grey
    //         backgroundColor: 'rgba(148,159,177,0.2)',
    //         borderColor: 'rgba(148,159,177,1)',
    //         pointBackgroundColor: 'rgba(148,159,177,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //     },
    //     {
    //         // dark grey
    //         backgroundColor: 'rgba(77,83,96,0.2)',
    //         borderColor: 'rgba(77,83,96,1)',
    //         pointBackgroundColor: 'rgba(77,83,96,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(77,83,96,1)'
    //     },
    //     {
    //         // grey
    //         backgroundColor: 'rgba(148,159,177,0.2)',
    //         borderColor: 'rgba(148,159,177,1)',
    //         pointBackgroundColor: 'rgba(148,159,177,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //     }
    // ];
    // public lineChartLegend: boolean = true;
    // public lineChartType: string = 'line';
    //
    // // events
    // public chartClicked(e: any): void {
    //     // console.log(e);
    // }
    //
    // public chartHovered(e: any): void {
    //     // console.log(e);
    // }
    //
    // public randomize(): void {
    //     // Only Change 3 values
    //     const data = [
    //         Math.round(Math.random() * 100),
    //         59,
    //         80,
    //         Math.random() * 100,
    //         56,
    //         Math.random() * 100,
    //         40
    //     ];
    //     const clone = JSON.parse(JSON.stringify(this.barChartData));
    //     clone[0].data = data;
    //     this.barChartData = clone;
    //     /**
    //      * (My guess), for Angular to recognize the change in the dataset
    //      * it has to change the dataset variable directly,
    //      * so one way around it, is to clone the data, change it and then
    //      * assign it;
    //      */
    // }
}
