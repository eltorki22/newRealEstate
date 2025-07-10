import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangesalariesService {

  constructor() { }
  http:HttpClient=inject(HttpClient);




  apiUrl=environment.apiUrl;




  getEmployeesalary(id:any){
    return this.http.get(this.apiUrl + `/api/Employee/GetById/${id}`)
  }
}
