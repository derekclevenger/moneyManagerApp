import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';
import {DashBoardServices} from '../../shared/services/dashboard.service';
import {BudgetService} from '../../shared/services/budget.service';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        PageHeaderModule,
        FormsModule
    ],
    declarations: [TablesComponent],
    providers: [ BudgetService, CurrencyPipe, DashBoardServices ]

})
export class TablesModule {}
