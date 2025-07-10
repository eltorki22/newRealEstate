import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  http:HttpClient=inject(HttpClient);
  
  constructor() { }


  apiUrl=environment.apiUrl;




  getNationality(){
    return this.http.get('assets/api/nationalities.json');
  }


  getDataAllList(pagination:any){
    return this.http.post(this.apiUrl + '/api/Employee/ListAsync',pagination)
  }


  addData(payload:any){


    return this.http.post(this.apiUrl + '/api/Employee/AddAsync',payload); 


  }


  getUpdateData(id:any){
    return this.http.get(this.apiUrl + `/api/Employee/GetById/${id}`)
  }

  updateData(id:any,payload:any){

      return this.http.put(this.apiUrl + `/api/Employee/EditAsync/${id}`,payload)

  }


  deleteData(id:any){


    return this.http.delete(this.apiUrl + `/api/Employee/DeleteAsync/${id}`);

  }

}
