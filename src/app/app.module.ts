import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

// 
// ✅ الصح
import { RouterModule } from '@angular/router';
import { SharedModule } from "./pages/dashboard/shared/shared.module";
import { authInterceptorInterceptor } from './shared/interceptor/auth-interceptor.interceptor';
import { LoadingComponent } from './pages/dashboard/shared/loading/loading.component';
import { IntersectionDirective } from './shared/directive/intersection.directive';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,

   

  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
    LoadingComponent
],
  providers: [
    // BsModalService,
    provideClientHydration(),
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useValue:authInterceptorInterceptor,
    //   multi:true
    // }
    // {
    //     provide: HTTP_INTERCEPTORS,
    // useFactory: () => authInterceptorInterceptor,
    // multi: true
    // }

     provideHttpClient(
      withInterceptors([authInterceptorInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
