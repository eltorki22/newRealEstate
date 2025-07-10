import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTenantRoutingModule } from './add-tenant-routing.module';
import { AddTenantComponent } from './add-tenant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';


@NgModule({
  declarations: [AddTenantComponent],
  imports: [
    CommonModule,
    AddTenantRoutingModule,
    ReactiveFormsModule,
    IntersectionDirective
  ]
})
export class AddTenantModule { }
