import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AddTenantService {

  constructor() { }

  http:HttpClient=inject(HttpClient);
  apiUrl=environment.apiUrl;


  getAllNationality(){

    return this.http.get('assets/api/nationalities.json')
    
  }

  addData(payload:any){
    return this.http.post(this.apiUrl + '/api/Tenant/AddAsync',payload);
  }


  getAllData(pagination:any){
    return this.http.post(this.apiUrl + '/api/Tenant/ListAsync',pagination);
  }


  getupdateData(id:any){
    return this.http.get(this.apiUrl + `/api/Tenant/GetById/${id}`)
  }


  updateData(id:any,payload:any){
       return this.http.put(this.apiUrl + `/api/Tenant/EditAsync/${id}`,payload)
  }

  deleteData(id:any){
    return this.http.delete(this.apiUrl + `/api/Tenant/DeleteAsync/${id}`);

  }


  searchData(search:any){
    return this.http.post(this.apiUrl + `/api/Tenant/Search`,search);

  }


  getRelations(){
    return this.http.get('assets/api/relations.json')
  }
}
