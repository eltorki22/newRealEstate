import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PreviousContractService {

  http:HttpClient=inject(HttpClient);



  apiUrl=environment.apiUrl;
  constructor() { }


  getAllData(pagination:any){
    return this.http.post(this.apiUrl + '/api/Contract/ListAsync',pagination)
  }


  searchData(data:any){

    return this.http.post(this.apiUrl + '/api/Contract/Search',data);
    
  }


  contractCancel(data:any){
    return this.http.post(this.apiUrl + '/api/Contract/ContractTermination',data)
  }


  getDataById(id:any){
    return this.http.get(this.apiUrl + `/api/Contract/GetById/${id}` );

  }
}
