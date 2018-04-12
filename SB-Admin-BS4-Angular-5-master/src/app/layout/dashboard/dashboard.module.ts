import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
// TODO try adding in the component to this and import it.
import { Ng2SmartTableModule } from 'ng2-smart-table';

import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import {UserService} from '../../shared/services/user.service';
import {DashBoardServices} from '../../shared/services/dashboard.service';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        StatModule,
        Ng2SmartTableModule
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
    ],
    providers: [ DashBoardServices, DatePipe, CurrencyPipe ]
})
export class DashboardModule {}
