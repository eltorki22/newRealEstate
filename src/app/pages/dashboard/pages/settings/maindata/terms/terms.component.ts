import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '../../../../../../shared/services/toastr.service';
import { Subscription } from 'rxjs';
import { MainDataService } from '../../../../../../shared/services/settings/main-data.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {

  companyForm:any


  fb:FormBuilder=inject(FormBuilder);
  toastr:ToastrService=inject(ToastrService);
  sub!:Subscription
  mainDataSer:MainDataService=inject(MainDataService)

  ngOnInit(): void {
 
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.companyForm = this.fb.group({
  // باقي الحقول...
  termsAndConditions: ['', [Validators.required]]
});

   this.getAllDataList();


  }


  onSubmit(){

   if (this.companyForm.invalid) {
            this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
      this.companyForm.markAllAsTouched();
      return;
    }

    let termsContent={
  termsAndConditions:this.companyForm.value.termsAndConditions 
      }

    this.sub=this.mainDataSer.updateDataTerms(termsContent).subscribe({
       next:(res:any)=>{
            this.toastr.show(' تم تعديل البيانات بنجاح', 'success');
            this.getAllDataList()

          },
          error:(err:any)=>{
            if(err.error.errors){
          const errorFields=err.error.errors;
          for(let key in errorFields){
            const message=errorFields[key];


            message.forEach((msg:any) => {

              this.toastr.show(msg,'error');
              
            });
          }
         }else{
         
            this.toastr.show('حدث خطأ أثناء العملية', 'error');

         }
        }
    })



  }



  getAllDataList(){
    this.sub=this.mainDataSer.getDataTerms().subscribe((res:any)=>{
      console.log(res)
      this.companyForm.patchValue({
        termsAndConditions:res.termsAndConditions
      })
    })
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.sub){
      this.sub.unsubscribe();
    }
  }


}
