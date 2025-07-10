import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError ,finalize } from 'rxjs';
import { ToastrService } from '../services/toastr.service';
import { LoadingService } from '../services/loading.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token');
  let toastr=inject(ToastrService)
  const loading = inject(LoadingService);

    loading.show();
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        toastr.show('لا يوجد اتصال بالإنترنت', 'error');
      } else if (error.status >= 500) {
        toastr.show('خطأ في السيرفر، يرجى المحاولة لاحقًا', 'error');
      } else if (error.status === 404) {
        toastr.show('المورد غير موجود (404)', 'error');
      } else if (error.status === 401) {
        toastr.show('غير مصرح بالدخول (401)', 'error');
      } else if (error.status === 403) {
        toastr.show('تم رفض الوصول (403)', 'error');
      } else if (error.status === 405) {
        toastr.show('(405) طريقة الإرسال غير صحيحة', 'error');
      }
      throw error;
    }),
    finalize (() => {

      // setTimeout(()=>{
 loading.hide(); // Hide loading spinner no matter what
      // },3000)
     
    })
  );
};