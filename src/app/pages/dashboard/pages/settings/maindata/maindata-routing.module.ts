import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaindataComponent } from './maindata.component';
import { Maindata2Component } from './maindata2/maindata2.component';

const routes: Routes = [
  {path:'',component:MaindataComponent,

    children:[
{path:'terms',loadChildren:()=>import('./terms/terms.module').then(m=>m.TermsModule)},    
      // {path:'maindata2',component:Maindata2Component},
        {
        path: 'maindata2',
        loadChildren: () =>
          import('./maindata2/maindata2.module').then((m) => m.Maindata2Module)
      },
        {path:'',redirectTo:'maindata2',pathMatch:'full'},
      
      
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaindataRoutingModule { }
