import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IntersectionDirective } from '../../../../shared/directive/intersection.directive';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IntersectionDirective,
    HomeRoutingModule,
    
    
   
  
  ]
})
export class HomeModule { }
