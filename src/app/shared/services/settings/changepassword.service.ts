import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor() { }

  http:HttpClient=inject(HttpClient);


  apiUrl=environment.apiUrl;


  
  changePassword(payload:any){
    return this.http.post(this.apiUrl + '/Auth/ChangePasswordAsync',payload)
  }
}
