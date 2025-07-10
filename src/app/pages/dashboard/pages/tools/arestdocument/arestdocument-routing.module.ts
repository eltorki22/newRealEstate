import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArestdocumentComponent } from './arestdocument.component';

const routes: Routes = [
  {path:'',component:ArestdocumentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArestdocumentRoutingModule { }
