import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LonelinessRoutingModule } from './loneliness-routing.module';
import { LonelinessComponent } from './loneliness.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../shared/confirm-delete/confirm-delete.component';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';


@NgModule({
  declarations: [LonelinessComponent],
  imports: [
    CommonModule,
    LonelinessRoutingModule,
    ReactiveFormsModule,
    ConfirmDeleteComponent,
    IntersectionDirective,
    PaginationComponent
  ]
})
export class LonelinessModule { }
