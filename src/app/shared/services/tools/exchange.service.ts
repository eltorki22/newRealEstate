import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  
    http:HttpClient=inject(HttpClient);

    apiUrl=environment.apiUrl;
  constructor() { }




  getAllDataList(pagination:any){
    return this.http.post(environment.apiUrl + '/api/PaymentVoucher/ListAsync',pagination)
  }


  addData(payload:any){
    return this.http.post(environment.apiUrl + '/api/PaymentVoucher/AddAsync',payload);

  }


  getUpdateData(id:any){

    return this.http.get(environment.apiUrl + `/api/PaymentVoucher/GetById/${id}`)

  }

  updateData(id:any,payload:any){
    return this.http.put(environment.apiUrl + `/api/PaymentVoucher/EditAsync/${id}`,payload)

  }

  deleteData(id:any){
    return this.http.delete(environment.apiUrl + `/api/PaymentVoucher/DeleteAsync/${id}`);
  }
}
