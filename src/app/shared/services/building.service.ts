import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor() { }


  apiUrl=environment.apiUrl;
  http:HttpClient=inject(HttpClient)



  getDataList(){
    return this.http.post(this.apiUrl + '/api/Propertie/ListAsync',{

  "pageIndex": 0,
  "pageSize": 0

    })
  }

  getDataListOwner(pagination:any){
   return this.http.post(this.apiUrl + '/api/Owner/ListAsync',pagination)
  }


  addData(buildingdata:any){
    return this.http.post(environment.apiUrl + '/api/Propertie/Add',buildingdata)
  }



  getUpdateData(id:any){
      return this.http.get(environment.apiUrl + `/api/Propertie/GetById/${id}`)
  }

  updateData(id:any,buildingData:any){
    
 return this.http.put(environment.apiUrl + `/api/Propertie/Edit/${id}`,buildingData)
  }

  deleteData(id:any){
    return this.http.delete(environment.apiUrl + `/api/Propertie/Delete/${id}`)
  }
}
