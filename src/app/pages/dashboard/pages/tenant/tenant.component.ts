import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrl: './tenant.component.scss'
})
export class TenantComponent {
visibleFilter=false
visibleShow=true;
subScription!:Subscription

router:Router=inject(Router);




ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

    if (this.router.url === '/dashboard/tenant/addtenant' || this.router.url === '/dashboard/tenant/addtenant') {
    this.visibleShow = false;
  } else {
    this.visibleShow = true;
  }
  this.subScription=this.router.events.pipe(filter(e=>e instanceof NavigationEnd)).subscribe(()=>{
    if(this.router.url ==  '/dashboard/tenant/addtenant' || this.router.url === '/dashboard/tenant/addtenant'){
      this.visibleShow=false

    }else{
      this.visibleShow=true
    }
  })
}



ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  if(this.subScription){
    this.subScription.unsubscribe();
  }
}
}
