import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginguardsGuard } from './shared/guards/loginguards.guard';

const routes: Routes = [
  {path:'login',loadChildren:()=>import('./pages/login/login.module').then(m=>m.LoginModule)},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'dashboard',loadChildren:()=>import('./pages/dashboard/dashboard.module').then(m=>m.DashboardModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
