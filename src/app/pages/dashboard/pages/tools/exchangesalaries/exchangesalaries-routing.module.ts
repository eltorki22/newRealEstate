import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangesalariesComponent } from './exchangesalaries.component';

const routes: Routes = [
  {path:'',component:ExchangesalariesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangesalariesRoutingModule { }
