import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  private LoadingSubject=new BehaviorSubject(false);
  

  loading=this.LoadingSubject.asObservable();


  show(){
    this.LoadingSubject.next(true);
  }


  hide(){
    this.LoadingSubject.next(false);
  }
}
