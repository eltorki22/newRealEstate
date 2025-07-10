import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SalafisService {

  http:HttpClient=inject(HttpClient);


  apiUrl=environment.apiUrl;

  constructor() { }



      getDataAllList(pagination:any){

        return this.http.post(this.apiUrl + '/api/EmployeeLoans/ListAsync',pagination)

        }



addData(payload:any){


  return this.http.post(this.apiUrl + '/api/EmployeeLoans/AddAsync',payload);

}


getUpdateData(id:any){
   return this.http.get(this.apiUrl + `/api/EmployeeLoans/GetById/${id}`);
}


updateData(id:any,payload:any){
  return this.http.put(this.apiUrl + `/api/EmployeeLoans/EditAsync/${id}`,payload);
}


deleteData(id:any){
  return this.http.delete(this.apiUrl + `/api/EmployeeLoans/DeleteAsync/${id}`)
}
}
