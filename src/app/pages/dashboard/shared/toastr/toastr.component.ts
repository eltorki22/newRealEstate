import { Component, inject } from '@angular/core';
import { ToastrService } from '../../../../shared/services/toastr.service';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrl: './toastr.component.scss'
})
export class ToastrComponent {
   toaster:ToastrService=inject(ToastrService);
   

   
}
