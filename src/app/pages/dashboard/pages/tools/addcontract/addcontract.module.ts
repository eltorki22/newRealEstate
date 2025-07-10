import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddcontractRoutingModule } from './addcontract-routing.module';
import { AddcontractComponent } from './addcontract.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddcontractComponent],
  imports: [
    CommonModule,
    AddcontractRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddcontractModule { }
