import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendmsgRoutingModule } from './sendmsg-routing.module';
import { SendmsgComponent } from './sendmsg.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';

// import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [SendmsgComponent],
  imports: [
    CommonModule,
    SendmsgRoutingModule,
    ReactiveFormsModule,
    IntersectionDirective,
    // NgSelectModule
  ]
})
export class SendmsgModule { }
