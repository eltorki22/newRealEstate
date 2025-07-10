import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantComponent } from './tenant.component';

const routes: Routes = [{
  path:'',component:TenantComponent,
children:[
  {path:'addtenant',loadChildren:()=>import('./add-tenant/add-tenant.module').then(m=>m.AddTenantModule)},
  {path:'hometenant',loadChildren:()=>import('./hometenant/hometenant.module').then(m=>m.HometenantModule)},
  {path:'',redirectTo:'hometenant',pathMatch:'full'}
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
