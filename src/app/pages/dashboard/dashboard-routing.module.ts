import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../dashboard/pages/home/home.component';
import { canactivateGuard } from '../../shared/guards/canactivate.guard';

const routes: Routes = [
  {path:'',component:DashboardComponent,
    canActivate:[canactivateGuard],
    children:[
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',component:HomeComponent},
      {path:'owner',loadChildren:()=>import('./pages/main/owner/owner.module').then(m=>m.OwnerModule)},
      {path:'realtor',loadChildren:()=>import('./pages/main/realtor/realtor.module').then(m=>m.RealtorModule)},
      {path:'tenant',loadChildren:()=>import('./pages/tenant/tenant.module').then(m=>m.TenantModule)},
      // {path:'addtenant',loadChildren:()=>import('./pages/tenant/add-tenant/add-tenant.module').then(m=>m.AddTenantModule)},
      {path:'building',loadChildren:()=>import('./pages/main/building/building.module').then(m=>m.BuildingModule)},
      {path:'loneliness',loadChildren:()=>import('./pages/main/loneliness/loneliness.module').then(m=>m.LonelinessModule)},
      {path:'services',loadChildren:()=>import('./pages/main/services/services.module').then(m=>m.ServicesModule)},
      {path:'newuser',loadChildren:()=>import('./pages/main/newuser/newuser.module').then(m=>m.NewuserModule)},
      {path:'groupname',loadChildren:()=>import('./pages/groupname/groupname.module').then(m=>m.GroupnameModule)},
      {path:'msgform',loadChildren:()=>import('./pages/main/msgform/msgform.module').then(m=>m.MsgformModule)},
      {path:'profile',loadChildren:()=>import('./pages/settings/profile/profile.module').then(m=>m.ProfileModule)},
      {path:'changepassword',loadChildren:()=>import('./pages/settings/changepassword/changepassword.module').then(m=>m.ChangepasswordModule)},
      {path:'maindata',loadChildren:()=>import('./pages/settings/maindata/maindata.module').then(m=>m.MaindataModule)},
      {path:'addcontract',loadChildren:()=>import('./pages/tools/addcontract/addcontract.module').then(m=>m.AddcontractModule)},
      {path:'previouscontract',loadChildren:()=>import('./pages/tools/previouscontract/previouscontract.module').then(m=>m.PreviouscontractModule)},
      {path:'arestdocument',loadChildren:()=>import('./pages/tools/arestdocument/arestdocument.module').then(m=>m.ArestdocumentModule)},
      {path:'exchange',loadChildren:()=>import('./pages/tools/exchange/exchange.module').then(m=>m.ExchangeModule)},
      {path:'accountstatement',loadChildren:()=>import('./pages/tools/accountstatement/accountstatement.module').then(m=>m.AccountstatementModule)},
      {path:'accounts',loadChildren:()=>import('./pages/tools/accounts/accounts.module').then(m=>m.AccountsModule)},
      {path:'employees',loadChildren:()=>import('./pages/tools/employees/employees.module').then(m=>m.EmployeesModule)},
      {path:'exchangesalaries',loadChildren:()=>import('./pages/tools/exchangesalaries/exchangesalaries.module').then(m=>m.ExchangesalariesModule)},
      {path:'salafis',loadChildren:()=>import('./pages/tools/salafis/salafis.module').then(m=>m.SalafisModule)},
      {path:'sendmsg',loadChildren:()=>import('./pages/tools/sendmsg/sendmsg.module').then(m=>m.SendmsgModule)},
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
