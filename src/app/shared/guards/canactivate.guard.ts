import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const canactivateGuard: CanActivateFn = (route, state) => {
  // return true;
  const auth=inject(AuthService);
  const router=inject(Router)

  if(auth.isLoggedIn()){
    return true;
  }else{
    router.navigate(['/login'])
    return false;
  }
};
