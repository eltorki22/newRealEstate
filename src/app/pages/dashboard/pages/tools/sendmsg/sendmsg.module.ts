import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendmsgRoutingModule } from './sendmsg-routing.module';
import { SendmsgComponent } from './sendmsg.component';


@NgModule({
  declarations: [SendmsgComponent],
  imports: [
    CommonModule,
    SendmsgRoutingModule
  ]
})
export class SendmsgModule { }
