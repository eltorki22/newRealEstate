import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsgformComponent } from './msgform.component';

const routes: Routes = [
  {path:'',component:MsgformComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MsgformRoutingModule { }
