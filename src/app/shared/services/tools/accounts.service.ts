import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor() { }

  http:HttpClient=inject(HttpClient);



  apiUrl=environment.apiUrl;



  getAllDataList(pagination:any){
    return this.http.post(this.apiUrl + '/api/Account/ListAsync',pagination)
  }

  // /api/Account/ListAsync



  addData(payload:any){
    return this.http.post(this.apiUrl + '/api/Account/AddAsync',payload)
  }



  getUpdateData(id:any){
      return this.http.get(this.apiUrl + `/api/Account/GetById/${id}`)
  }


  updateData(payload:any){
    return this.http.put(this.apiUrl + `/api/Account/EditAsync`,payload)
  }


  deleteData(id:any){
       return this.http.delete(this.apiUrl + `/api/Account/DeleteAsync/${id}`)
  }
}
