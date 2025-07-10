import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangesalariesRoutingModule } from './exchangesalaries-routing.module';
import { ExchangesalariesComponent } from './exchangesalaries.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ExchangesalariesComponent],
  imports: [
    CommonModule,
    ExchangesalariesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ExchangesalariesModule { }
