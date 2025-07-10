import { AbstractControl, ValidationErrors } from "@angular/forms";


export function FileRequired(control:AbstractControl){
   return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (!file || file.length === 0) {
      return { required: true };
    }
    return null;
  };
}