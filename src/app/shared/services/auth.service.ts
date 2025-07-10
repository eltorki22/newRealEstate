import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { jwtDecode }  from 'jwt-decode'
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http:HttpClient=inject(HttpClient)
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  apiUrl=environment.apiUrl;



  isTokenExpired(token : string){
    try{
        const decoded: any = jwtDecode(token); 
           const now = Math.floor(Date.now() / 1000);
            return decoded.exp < now;
    }
    catch(error){
 console.error('Invalid token:', error);
      return true;
    }

  }


   checkAndRemoveExpiredToken() {

    // if(window  == undefined) return false;
    // const token = localStorage.getItem('token');

    // if (token && this.isTokenExpired(token)) {
    //   localStorage.removeItem('token');
    //   console.warn('Token has expired and was removed from localStorage');
    // }

     if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (token && this.isTokenExpired(token)) {
        localStorage.removeItem('token');
        console.warn('Token expired and removed');
      }
    }
  }

  onLogin(username:string,password:string){
    const data={
      username:username,
      password:password,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0ZDhjOTJmZC01ZTRmLTQ1MDMtYmU4OS1jMTQ4Y2NhMjA3NzkiLCJlbWFpbCI6ImFjNTM4MDQ1ODlAZW1haWx5LnBybyIsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJuYmYiOjE3NTE0NTE4MzksImV4cCI6MTc1MTQ1NTQzOSwiaWF0IjoxNzUxNDUxODM5LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZXJTeXMiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZXJTeXMifQ.Yia6_KdqvKX0EYQaLynGwNMkZfeL1OYwM88Tn7XPDgY"
    }


    return this.http.post(this.apiUrl + '/Auth/login' , data)

  }



  isLoggedIn(){
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('token');
  }


}
