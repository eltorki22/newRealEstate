import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractrenewalRoutingModule } from './contractrenewal-routing.module';
import { ContractrenewalComponent } from './contractrenewal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';


@NgModule({
  declarations: [ContractrenewalComponent],
  imports: [
    CommonModule,
    ContractrenewalRoutingModule,
    ReactiveFormsModule,IntersectionDirective
  ]
})
export class ContractrenewalModule { }
