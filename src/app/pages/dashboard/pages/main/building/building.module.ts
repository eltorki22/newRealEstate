import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingRoutingModule } from './building-routing.module';
import { BuildingComponent } from './building.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../shared/confirm-delete/confirm-delete.component';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';


@NgModule({
  declarations: [BuildingComponent],
  imports: [
    CommonModule,
    BuildingRoutingModule,
    ReactiveFormsModule,
    ConfirmDeleteComponent,
    IntersectionDirective,
    PaginationComponent
  ]
})
export class BuildingModule { }
