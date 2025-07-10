import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupnameComponent } from './groupname.component';

const routes: Routes = [
  {path:'',component:GroupnameComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupnameRoutingModule { }
