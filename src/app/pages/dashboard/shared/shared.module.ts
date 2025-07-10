import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ToastrComponent } from './toastr/toastr.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LogoComponent } from './logo/logo.component';




@NgModule({
  declarations: [HeaderComponent,SidebarComponent, ToastrComponent],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    // AccordionModule.forRoot(),
    AccordionModule,
    LogoComponent
],
  exports:[HeaderComponent,SidebarComponent,ToastrComponent],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
