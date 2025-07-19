import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MsgFormService {

  constructor() { }

  

  http:HttpClient=inject(HttpClient)


  apiUrl=environment.apiUrl;

  getDataAllList(pagination:any){

    return this.http.post(this.apiUrl + '/api/ContactMessage/ListAsync',pagination);
  }



  addData(msgData:any){

    return this.http.post(this.apiUrl + '/api/ContactMessage/Add',msgData)

  }


  getUpdateData(id:any){

    return this.http.get(this.apiUrl + `/api/ContactMessage/GetById/${id}`);

  }

  updateData(msgData:any){
    return this.http.put(this.apiUrl + `/api/ContactMessage/Edit`,msgData)
  }


  deleteData(id:any){

    return this.http.delete(this.apiUrl + `/api/ContactMessage/Delete/${id}`)
  }
}
