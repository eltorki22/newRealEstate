import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Maindata2RoutingModule } from './maindata2-routing.module';
import { Maindata2Component } from './maindata2.component';


@NgModule({
  declarations: [Maindata2Component],
  imports: [
    CommonModule,
    Maindata2RoutingModule
  ]
})
export class Maindata2Module { }
