import { AuthService } from './shared/services/auth.service';
import { LoadingService } from './shared/services/loading.service';
import { ChangeDetectorRef, Component, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'realestate';

  LoadingService:LoadingService=inject(LoadingService);


  loading$ = this.LoadingService.loading;

   constructor(private authService: AuthService,private cdr:ChangeDetectorRef) {}


   loading: boolean = false;


  ngOnInit(): void {


    this.authService.checkAndRemoveExpiredToken();

    // setTimeout(() => this.cdr.detectChanges(), 0);
  }

  ngAfterViewInit(): void {
  // يجبر Angular يعيد التحقق بعد أول رسم
  this.cdr.detectChanges();
}


  
}
