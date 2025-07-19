import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangesalariesRoutingModule } from './exchangesalaries-routing.module';
import { ExchangesalariesComponent } from './exchangesalaries.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';


@NgModule({
  declarations: [ExchangesalariesComponent],
  imports: [
    CommonModule,
    ExchangesalariesRoutingModule,
    ReactiveFormsModule,
    IntersectionDirective
  ]
})
export class ExchangesalariesModule { }
