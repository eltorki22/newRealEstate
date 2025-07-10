import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewuserRoutingModule } from './newuser-routing.module';
import { NewuserComponent } from './newuser.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteService } from '../../../../../shared/services/confirm-delete.service';
import { ConfirmDeleteComponent } from '../../../shared/confirm-delete/confirm-delete.component';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';


@NgModule({
  declarations: [NewuserComponent],
  imports: [
    CommonModule,
    NewuserRoutingModule,
    ReactiveFormsModule,
    ConfirmDeleteComponent,
    IntersectionDirective,
    PaginationComponent
  ]
})
export class NewuserModule { }
