import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { catchError } from 'rxjs';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor() { }

  http:HttpClient=inject(HttpClient);




  apiUrl=environment.apiUrl;






  addOwner(ownerData:any){

    return this.http.post(this.apiUrl + '/api/Owner/Add',ownerData)

  }


  getListData(pagination:any){
     return this.http.post(this.apiUrl + '/api/Owner/ListAsync',pagination)

  
  }


  getNationality(){
    return this.http.get("assets/api/nationalities.json")
  }


  getupdateData(id:any){
 return this.http.get(environment.apiUrl + `/api/Owner/GetById/${id}`)
  }


  updateData(id:any,ownerData:any){
 return this.http.put(environment.apiUrl + `/api/Owner/Edit/${id}`,ownerData)

  }


  deleteData(id:any){
   return this.http.delete(environment.apiUrl + `/api/Owner/Delete/${id}`)
  }
}
