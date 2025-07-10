import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealtorRoutingModule } from './realtor-routing.module';
import { RealtorComponent } from './realtor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';
import { ConfirmDeleteComponent } from '../../../shared/confirm-delete/confirm-delete.component';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';

@NgModule({
  declarations: [RealtorComponent,
    // IntersectionDirective
  ],
  imports: [
    CommonModule,
    RealtorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDeleteComponent,
    IntersectionDirective,
    PaginationComponent
    
  ]
})
export class RealtorModule { }
