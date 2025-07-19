import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangepasswordRoutingModule } from './changepassword-routing.module';
import { ChangepasswordComponent } from './changepassword.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';


@NgModule({
  declarations: [ChangepasswordComponent],
  imports: [
    CommonModule,
    ChangepasswordRoutingModule,
    ReactiveFormsModule,
    IntersectionDirective
  ]
})
export class ChangepasswordModule { }
