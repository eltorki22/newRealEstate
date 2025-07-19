import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendUserService {

  private userSource=new  BehaviorSubject<any>(this.getUserFromStorage());
  user$ = this.userSource.asObservable();

    getUserFromStorage() {
    const userJson = localStorage.getItem('dataUser');
    return userJson ? JSON.parse(userJson) : null;
  }

    setUser(user: any) {
    localStorage.setItem('dataUser', JSON.stringify(user));
    this.userSource.next(user);
  }

  constructor() { }
}
