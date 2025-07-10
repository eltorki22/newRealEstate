import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalafisComponent } from './salafis.component';

const routes: Routes = [
  {path:'',component:SalafisComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalafisRoutingModule { }
