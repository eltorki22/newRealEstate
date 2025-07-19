import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaindataRoutingModule } from './maindata-routing.module';
import { MaindataComponent } from './maindata.component';
import { RouterModule } from '@angular/router';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';


@NgModule({
  declarations: [MaindataComponent],
  imports: [
    CommonModule,
    MaindataRoutingModule,
    RouterModule,
    IntersectionDirective
  ]
})
export class MaindataModule { }
