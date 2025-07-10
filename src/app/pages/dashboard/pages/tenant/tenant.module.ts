import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantComponent } from './tenant.component';
import { RouterModule } from '@angular/router';
import { AddTenantComponent } from './add-tenant/add-tenant.component';
import { HometenantComponent } from './hometenant/hometenant.component';
import { IntersectionDirective } from '../../../../shared/directive/intersection.directive';


@NgModule({
  declarations: [TenantComponent],
  imports: [
    CommonModule,
    TenantRoutingModule,
    RouterModule,
    IntersectionDirective
  ]
})
export class TenantModule { }
