import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from 'express';

export const loginguardsGuard: CanActivateFn = (route, state) => {
  const auth=inject(AuthService);
  const router=inject(Router);
  

  if(auth.isLoggedIn()){
      router.navigate(['/dashboard/home']);
      return false;
  }
  return true;
  
};
