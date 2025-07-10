import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor() { }

  http:HttpClient=inject(HttpClient)

  apiUrl=environment.apiUrl;
  getAllListData(pagination:any){
    return this.http.post(this.apiUrl + '/api/Service/ListAsync',pagination);
  }


  addData(servicesData:any){
       return this.http.post(this.apiUrl + '/api/Service/Add',servicesData); 
  }


    getUpdateData(id:any){
 return this.http.get(this.apiUrl + `/api/Service/GetById/${id}`)

  }



  updateData(id:any,servicesData:any){
    return this.http.put(this.apiUrl + `/api/Service/Edit/${id}`,servicesData)

  }


  deleteData(id:any){
    return this.http.delete(this.apiUrl + `/api/Service/Delete/${id}`)
  }
  
}
