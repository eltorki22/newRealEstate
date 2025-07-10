import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeleteService {
 private confirmSubject = new Subject<boolean>();
  private messageSubject = new Subject<string>();

  // Observable للمكون يسمع الرد (نعم/لا)
  public confirmResult$ = this.confirmSubject.asObservable();

  // Observable لنرسل رسالة تأكيد مخصصة
  public confirmMessage$ = this.messageSubject.asObservable();

  // افتح المودال مع رسالة، وارجع Promise للنتيجة
  public confirm(message: string): Promise<boolean> {
    this.messageSubject.next(message);
    return new Promise<boolean>((resolve) => {
      this.confirmResult$.subscribe((result) => {
        resolve(result);
      });
    });
  }

  // استدعيها لتأكيد (نعم)
  public confirmYes() {
    this.confirmSubject.next(true);
  }

  // استدعيها للإلغاء (لا)
  public confirmNo() {
    this.confirmSubject.next(false);
  }
}
