import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MsgformRoutingModule } from './msgform-routing.module';
import { MsgformComponent } from './msgform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteService } from '../../../../../shared/services/confirm-delete.service';
import { ConfirmDeleteComponent } from '../../../shared/confirm-delete/confirm-delete.component';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';


@NgModule({
  declarations: [MsgformComponent],
  imports: [
    CommonModule,
    MsgformRoutingModule,
    ReactiveFormsModule,
    // ConfirmDeleteService
    ConfirmDeleteComponent,
    IntersectionDirective
  ]
})
export class MsgformModule { }
