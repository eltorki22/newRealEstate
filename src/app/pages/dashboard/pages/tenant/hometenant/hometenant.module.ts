import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HometenantRoutingModule } from './hometenant-routing.module';
import { HometenantComponent } from './hometenant.component';
import { ConfirmDeleteComponent } from '../../../shared/confirm-delete/confirm-delete.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { IntersectionDirective } from '../../../../../shared/directive/intersection.directive';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HometenantComponent],
  imports: [
    CommonModule,
    HometenantRoutingModule,
    ConfirmDeleteComponent,
    NgxPaginationModule,
    IntersectionDirective,
    PaginationComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HometenantModule { }
