import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrl: './tenant.component.scss'
})
export class TenantComponent implements OnInit, OnDestroy {

  visibleShow = true;
  subScription!: Subscription;
  title:Title=inject(Title);

  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {

    this.title.setTitle('المستأجر')

    this.subScription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateVisibility();
      });


    this.updateVisibility();
  }


pageTitle = '';
showAddButton = false;

updateVisibility() {
  const url = this.router.url;

  if (url.includes('/dashboard/tenant/addtenant')) {
    this.pageTitle = url.includes('?id=') ? 'تعديل مستأجر' : 'إضافة مستأجر جديد';
    this.showAddButton = false;
  } else {
    this.pageTitle = 'المستأجر';
    this.showAddButton = true;
  }
}



  ngOnDestroy(): void {
    if (this.subScription) {
      this.subScription.unsubscribe();
    }
  }
}
