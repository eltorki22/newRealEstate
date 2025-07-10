import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupnameRoutingModule } from './groupname-routing.module';
import { GroupnameComponent } from './groupname.component';


@NgModule({
  declarations: [GroupnameComponent],
  imports: [
    CommonModule,
    GroupnameRoutingModule
  ]
})
export class GroupnameModule { }
