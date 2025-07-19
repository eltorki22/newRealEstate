import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviouscontractComponent } from './previouscontract.component';

const routes: Routes = [
  {path:'',component:PreviouscontractComponent
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviouscontractRoutingModule { }
