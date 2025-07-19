import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddcontractRoutingModule } from './addcontract-routing.module';
import { AddcontractComponent } from './addcontract.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';


@NgModule({
  declarations: [AddcontractComponent],
  imports: [
    CommonModule,
    AddcontractRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IntersectionDirective
  ]
})
export class AddcontractModule { }
