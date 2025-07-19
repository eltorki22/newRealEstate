import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountstatementRoutingModule } from './accountstatement-routing.module';
import { AccountstatementComponent } from './accountstatement.component';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';


@NgModule({
  declarations: [AccountstatementComponent],
  imports: [
    CommonModule,
    AccountstatementRoutingModule,
    IntersectionDirective
  ]
})
export class AccountstatementModule { }
