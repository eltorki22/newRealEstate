import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ArrestdocumentService {

  http:HttpClient=inject(HttpClient);


  apiUrl=environment.apiUrl;
  constructor() { }



  getAllListData(pagination:any){
    return this.http.post(this.apiUrl + '/api/ReceiptVoucher/ListAsync',pagination)
  }


  getNameTenant(){
    return this.http.post(this.apiUrl + '/api/Tenant/ListAsync',{
  "pageIndex": 0,
  "pageSize": 0
})
  }


  addData(payload:any){

    return this.http.post(this.apiUrl + '/api/ReceiptVoucher/AddAsync',payload); 

  }



  getUpdateData(id:any){

    return this.http.get(environment.apiUrl + `/api/ReceiptVoucher/GetById/${id}`);

  }

  updateData(id:any,payload:any){

    return this.http.put(environment.apiUrl + `/api/ReceiptVoucher/EditAsync/${id}`,payload)
    
  }

  deleteData(id:any){
       return this.http.delete(environment.apiUrl + `/api/ReceiptVoucher/DeleteAsync/${id}`)
  }

}
