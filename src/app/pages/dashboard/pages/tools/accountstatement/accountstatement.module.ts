import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountstatementRoutingModule } from './accountstatement-routing.module';
import { AccountstatementComponent } from './accountstatement.component';


@NgModule({
  declarations: [AccountstatementComponent],
  imports: [
    CommonModule,
    AccountstatementRoutingModule
  ]
})
export class AccountstatementModule { }
