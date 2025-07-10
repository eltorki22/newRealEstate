import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviouscontractRoutingModule } from './previouscontract-routing.module';
import { PreviouscontractComponent } from './previouscontract.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [PreviouscontractComponent],
  imports: [
    CommonModule,
    PreviouscontractRoutingModule,
    AccordionModule,
      
        
  ]
})
export class PreviouscontractModule { }
