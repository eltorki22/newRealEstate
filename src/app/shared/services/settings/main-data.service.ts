import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MainDataService {

  http:HttpClient=inject(HttpClient);


  apiUrl=environment.apiUrl;

  constructor() { }




  getData(){
    return this.http.post(this.apiUrl + '/api/CompanyInfo/GetCompanyInfo',null);
  }


  updateData(payload:any){

 return this.http.put(this.apiUrl + '/api/CompanyInfo/UpdateCompanyInfo',payload);
  }


  getDataTerms(){
        return this.http.post(this.apiUrl + '/api/CompanyInfo/GetTermsAndConditions',null);
  }


  updateDataTerms(payload:any){
   return this.http.put(this.apiUrl + '/api/CompanyInfo/UpdateTermsAndConditions',payload);
  }
}
