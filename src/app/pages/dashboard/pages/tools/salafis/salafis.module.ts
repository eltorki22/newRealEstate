import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalafisRoutingModule } from './salafis-routing.module';
import { SalafisComponent } from './salafis.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { ConfirmDeleteComponent } from '../../../shared/confirm-delete/confirm-delete.component';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';


@NgModule({
  declarations: [SalafisComponent],
  imports: [
    CommonModule,
    SalafisRoutingModule,
    ReactiveFormsModule,
    PaginationComponent,
    ConfirmDeleteComponent,
    IntersectionDirective
  ]
})
export class SalafisModule { }
