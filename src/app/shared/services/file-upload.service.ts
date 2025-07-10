import { inject, Injectable } from '@angular/core';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  toastr:ToastrService=inject(ToastrService);


  handleFileUploaded(
    event: any,
    form: any,
    controlName: string,
    maxSizeInMB = 4
  ){

    if(event.target.files.length > 0){
       const file = event.target.files[0];
         const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
         if(file.size > maxSizeInBytes){
           form.patchValue({ [controlName]: null });
           form.get(controlName)?.setErrors({ maxSize: true });
             this.toastr.show(
          `حجم الملف كبير جداً. الرجاء اختيار ملف أصغر من ${maxSizeInMB} ميجابايت.`,
          'error'
        );
        return null;
         }

          form.patchValue({ [controlName]: file });
         form.get(controlName)?.setErrors(null);
         return {name:file.name,file}

    }else{
      form.patchValue({ [controlName]: null });
      return null;
    }

  }
}
