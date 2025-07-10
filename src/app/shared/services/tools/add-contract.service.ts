import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AddContractService {
  http:HttpClient=inject(HttpClient)

  constructor() { }


apiUrl=environment.apiUrl;


  getAllContactMessage(){
    return this.http.post(this.apiUrl + '/api/ContactMessage/ListAsync',{
  "pageIndex": 0,
  "pageSize": 0
})
  }


  addContract(payload:any){
    return this.http.post(this.apiUrl + '/api/Contract/AddAsync',payload)
  }
}
