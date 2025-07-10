import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Maindata2Component } from './maindata2.component';

const routes: Routes = [
  {path:'',component:Maindata2Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Maindata2RoutingModule { }
