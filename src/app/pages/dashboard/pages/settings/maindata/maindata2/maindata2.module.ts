import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Maindata2RoutingModule } from './maindata2-routing.module';
import { Maindata2Component } from './maindata2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IntersectionDirective } from '../../../../../../shared/directive/intersection.directive';


@NgModule({
  declarations: [Maindata2Component],
  imports: [
    CommonModule,
    Maindata2RoutingModule,
    ReactiveFormsModule,
    IntersectionDirective
  ]
})
export class Maindata2Module { }
