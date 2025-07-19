import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractrenewalComponent } from './contractrenewal.component';

const routes: Routes = [
  {path:'',component:ContractrenewalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractrenewalRoutingModule { }
