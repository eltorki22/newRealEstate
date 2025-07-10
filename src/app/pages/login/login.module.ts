import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IntersectionDirective } from '../../shared/directive/intersection.directive';
import { LogoComponent } from '../dashboard/shared/logo/logo.component';


@NgModule({
  declarations: [
    LoginComponent,
    // IntersectionDirective
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    IntersectionDirective,
    LogoComponent
  ]
})
export class LoginModule { }
