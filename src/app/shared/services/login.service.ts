import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  apiUrl=environment.apiUrl;




  http:HttpClient=inject(HttpClient);

  constructor() { }



  sendEmail(email:any){
    return this.http.post(this.apiUrl + "/Auth/send-otp",email)
  }


  verifyEmail(data:any){
    return this.http.post(this.apiUrl + '/Auth/verify-otp',data)
  }


  ChangePassword(data:any){
      return this.http.post(this.apiUrl + '/Auth/reset-password',data)
  }
}
