import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviouscontractRoutingModule } from './previouscontract-routing.module';
import { PreviouscontractComponent } from './previouscontract.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';
import { PaginationService } from 'ngx-pagination';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';


@NgModule({
  declarations: [PreviouscontractComponent],
  imports: [
    CommonModule,
    PreviouscontractRoutingModule,
    AccordionModule,
    FormsModule,
    IntersectionDirective,
    ReactiveFormsModule,
    PaginationComponent
        
  ]
})
export class PreviouscontractModule { }
