import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NewuserService {

  constructor() { }


  http:HttpClient=inject(HttpClient);


  apiUrl=environment.apiUrl;


  getAllListData(pagination:any){
    return this.http.post(this.apiUrl + '/api/User/ListAsync',pagination)
  }



  addData(newUserData:any){
    return this.http.post(this.apiUrl + '/api/User/AddAsync',newUserData)

  }


  getUpdateData(id:any){

    return this.http.get(this.apiUrl + `/api/User/GetById/${id}`);

  }


  updateData(id:any,newUserData:any){
    return this.http.post(environment.apiUrl + `/api/User/EditAsync/${id}`,newUserData)

  }

  deleteData(id:any){
      return this.http.delete(environment.apiUrl + `/api/User/Delete/${id}`)

  }
}
