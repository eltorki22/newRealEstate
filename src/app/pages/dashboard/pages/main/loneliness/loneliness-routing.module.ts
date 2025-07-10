import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LonelinessComponent } from './loneliness.component';

const routes: Routes = [{
  path:'',component:LonelinessComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LonelinessRoutingModule { }
