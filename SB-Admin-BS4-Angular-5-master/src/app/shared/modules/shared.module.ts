import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MyFocusDirective} from '../../directives/focus.directive';
import {SpinnerComponent} from '../../spinner/spinner.component';


@NgModule({
    imports:      [CommonModule],
    declarations: [MyFocusDirective, SpinnerComponent],
    exports:      [MyFocusDirective, SpinnerComponent],
    providers:    []
})
export class SharedModule { }
