import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../shared/confirm-delete/confirm-delete.component';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';


@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    ReactiveFormsModule,
    ConfirmDeleteComponent,
    IntersectionDirective,
    PaginationComponent
  ]
})
export class ServicesModule { }
