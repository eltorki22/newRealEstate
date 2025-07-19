import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SendMsgService {

  constructor() { }

  http:HttpClient=inject(HttpClient);



  apiUrl=environment.apiUrl;




  addData(payload:any){
    return this.http.post(this.apiUrl + '/api/MessageSend/AddAsync',payload)
  }
}
