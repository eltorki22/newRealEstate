import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HometenantComponent } from './hometenant.component';

const routes: Routes = [
  {path:'',component:HometenantComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HometenantRoutingModule { }
