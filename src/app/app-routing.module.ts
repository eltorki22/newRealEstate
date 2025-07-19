import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginguardsGuard } from './shared/guards/loginguards.guard';
import { loginGuardMatch } from './shared/guards/canmatchlogin.guard';

const routes: Routes = [
  {path:'login',
    canLoad:[loginGuardMatch]
    ,loadChildren:()=>import('./pages/login/login.module').then(m=>m.LoginModule)},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'dashboard',loadChildren:()=>import('./pages/dashboard/dashboard.module').then(m=>m.DashboardModule)},
   {path:'**',loadChildren:()=>import('./shared/notfound/notfound.module').then(m=>m.NotfoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
