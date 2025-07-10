import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RealtorService {

  constructor() { }
  http:HttpClient=inject(HttpClient);



  apiUrl=environment.apiUrl;


   getListData(body:any){
     return this.http.post(this.apiUrl + '/api/Broker/ListAsync',body)
  }


  getNationality(){
    return this.http.get("assets/api/nationalities.json");
  }


    addData(realtorData:any){

    return this.http.post(this.apiUrl + '/api/Broker/Add',realtorData)

  }

  getUpdateData(id:any){
 return this.http.get(this.apiUrl + `/api/Broker/GetById/${id}`)

  }



  updateData(id:any,realtorData:any){
    return this.http.put(this.apiUrl + `/api/Broker/Edit/${id}`,realtorData)

  }


  deleteData(id:any){
 return this.http.delete(this.apiUrl + `/api/Broker/Delete/${id}`)
  }
}
