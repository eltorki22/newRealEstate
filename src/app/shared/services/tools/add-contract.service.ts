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

  searchOwner(payload:any){

    return this.http.post(this.apiUrl + '/api/Owner/Search',payload);

  }

  searchTenant(payload:any){
    return this.http.post(this.apiUrl + '/api/Tenant/Search',payload);

  }


  searchBroker(payload:any){
     return this.http.post(this.apiUrl + '/api/Broker/Search',payload);
  }


  getDataSearch(id:any){
    return this.http.get(this.apiUrl + `/api/Contract/GetById/${id}`);

  }



  contractRenewal(data:any){
    return this.http.post(this.apiUrl + '/api/Contract/RenewContractAsync',data)
  }





  
}

