import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http:HttpClient=inject(HttpClient);

  constructor() { }




  apiUrl=environment.apiUrl;




  updateData(id:any,payload:any){
   return this.http.post(this.apiUrl + `/api/User/EditAsync/${id}`,payload);
  }



  
}
