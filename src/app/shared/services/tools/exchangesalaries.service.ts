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




  getEmployeesalary(){
    return this.http.get(this.apiUrl + `/api/Employee/GetEmployeesWithSalaryAndLoans`)
  }



  getDataAllList(pagination:any){

    return this.http.post(this.apiUrl + '/api/SalaryVoucher/ListAsync',pagination);
    
  }

  addData(payload:any){
     return this.http.post(this.apiUrl + '/api/SalaryVoucher/Add',payload);

  }

}
