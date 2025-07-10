import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaindataRoutingModule } from './maindata-routing.module';
import { MaindataComponent } from './maindata.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [MaindataComponent],
  imports: [
    CommonModule,
    MaindataRoutingModule,
    RouterModule
  ]
})
export class MaindataModule { }
