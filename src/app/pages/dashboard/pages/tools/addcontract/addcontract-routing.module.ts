import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcontractComponent } from './addcontract.component';

const routes: Routes = [
  {path:'',component:AddcontractComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddcontractRoutingModule { }
