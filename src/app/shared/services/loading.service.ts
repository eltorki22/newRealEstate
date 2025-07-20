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
      setTimeout(() => {
    this.LoadingSubject.next(true);
  });
  }


  hide(){
      setTimeout(() => {
    this.LoadingSubject.next(false);
  });
  }
}
