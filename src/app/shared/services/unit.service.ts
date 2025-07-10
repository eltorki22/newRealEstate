import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor() { }


  apiUrl=environment.apiUrl;
  http:HttpClient=inject(HttpClient)

  getAllListData(pagination:any){

    return this.http.post(this.apiUrl + '/api/Unit/ListAsync',pagination)

  }



  addData(unitData:any){
    return this.http.post(this.apiUrl + '/api/Unit/Add',unitData)
  }

  getUpdateData(id:any){

  return this.http.get(environment.apiUrl + `/api/Unit/GetById/${id}`)

  }

  updateData(id:any,unitData:any){

  return this.http.put(environment.apiUrl + `/api/Unit/Edit/${id}`,unitData);   

  }


  deleteData(id:any){
     return this.http.delete(environment.apiUrl + `/api/Unit/Delete/${id}`);   

  }
}
