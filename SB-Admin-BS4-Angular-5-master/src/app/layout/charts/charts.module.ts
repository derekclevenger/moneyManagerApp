import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {BudgetService} from '../../shared/services/budget.service';
import {FormsModule} from '@angular/forms';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule } from '@angular/material';



@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        ChartsRoutingModule,
        PageHeaderModule,
        Ng2SmartTableModule,
        FormsModule,
    ],
    declarations: [ChartsComponent],
    providers: [ BudgetService, CurrencyPipe ]

})
export class ChartsModule {}
