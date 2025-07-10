import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerComponent } from './owner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../shared/confirm-delete/confirm-delete.component';
import { RouterModule } from '@angular/router';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';


@NgModule({
  declarations: [OwnerComponent,
    // IntersectionDirective
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    ConfirmDeleteComponent,
    IntersectionDirective,
    PaginationComponent
  ]
})
export class OwnerModule { }
