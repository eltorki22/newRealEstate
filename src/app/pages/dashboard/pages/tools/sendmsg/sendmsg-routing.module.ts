import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendmsgComponent } from './sendmsg.component';

const routes: Routes = [
  {path:'',component:SendmsgComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendmsgRoutingModule { }
