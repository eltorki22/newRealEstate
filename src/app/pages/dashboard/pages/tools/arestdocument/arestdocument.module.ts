import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArestdocumentRoutingModule } from './arestdocument-routing.module';
import { ArestdocumentComponent } from './arestdocument.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../shared/confirm-delete/confirm-delete.component';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';


@NgModule({
  declarations: [ArestdocumentComponent],
  imports: [
    CommonModule,
    ArestdocumentRoutingModule,
    ReactiveFormsModule,
    ConfirmDeleteComponent,
    PaginationComponent,
    IntersectionDirective
  ]
})
export class ArestdocumentModule { }
