import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountstatementComponent } from './accountstatement.component';

const routes: Routes = [
  {path:'',component:AccountstatementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountstatementRoutingModule { }
