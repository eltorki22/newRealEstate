import { AuthService } from './shared/services/auth.service';
import { LoadingService } from './shared/services/loading.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'realestate';

  LoadingService:LoadingService=inject(LoadingService);


  loading$ = this.LoadingService.loading;

   constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkAndRemoveExpiredToken();
  }
}
