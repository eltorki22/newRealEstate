import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MainDataService } from '../../../../../../shared/services/settings/main-data.service';
import { ToastrService } from '../../../../../../shared/services/toastr.service';

@Component({
  selector: 'app-maindata2',
  templateUrl: './maindata2.component.html',
  styleUrl: './maindata2.component.scss'
})
export class Maindata2Component {

   companyForm!: any;
   sub!:Subscription;
   mainDataSer:MainDataService=inject(MainDataService);
  toastr:ToastrService=inject(ToastrService);
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAllData();
    this.companyForm = this.fb.group({
      nameAr: ['', Validators.required],
      nameEn: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      taxNumber: ['', Validators.required],
      commercialRegister: ['', Validators.required],
      bankAccount: ['', Validators.required],
      address: ['', Validators.required],
      commissionPercentage: ['', [Validators.required]],
      autoCollectEnabled: [true],
      // termsAndConditions: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.companyForm.invalid) {
            // this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
      this.companyForm.markAllAsTouched();
      return;
    }

    const form={
        nameAr:this.companyForm.value.nameAr,
      nameEn: this.companyForm.value.nameEn,
      phoneNumber: this.companyForm.value.phoneNumber,
      email: this.companyForm.value.email,
      taxNumber: this.companyForm.value.taxNumber,
      commercialRegister: this.companyForm.value.commercialRegister,
      bankAccount: this.companyForm.value.bankAccount,
      address: this.companyForm.value.address,
      commissionPercentage:this.companyForm.value.commissionPercentage,
      autoCollectEnabled:this.companyForm.value.autoCollectEnabled,
    }

    
    this.sub=this.mainDataSer.updateData(form).subscribe({
      
          next:(res)=>{
            this.toastr.show(' تم تعديل البيانات بنجاح', 'success');
            this.getAllData()

          },
          error:(err)=>{
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



  getAllData(){
    this.sub=this.mainDataSer.getData().subscribe((res:any)=>{
      this.companyForm.patchValue({
        nameAr: res.nameAr,
      nameEn: res.nameEn,
      phoneNumber: res.phoneNumber,
      email: res.email,
      taxNumber: res.taxNumber,
      commercialRegister: res.commercialRegister,
      bankAccount: res.bankAccount,
      address: res.address,
      commissionPercentage: res.commissionPercentage,
      autoCollectEnabled:res.autoCollectEnabled,
      })

      
    })
  }


  validationNameAr(e:any){
  const key = e.key;
  const arabicCharRegex = /^[\u0600-\u06FF\s]$/;
  if (!arabicCharRegex.test(key) && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
    e.preventDefault();
  }

  }



  validationNameEn(e:any){
    let key=e.key;
     const englishRegex = /^[a-zA-Z\s]$/;
  if (!englishRegex.test(key) && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Tab') {
    e.preventDefault();
  }
  }


  ValidationNumber(e:any){
    let charCode=e.key.charCodeAt(0);


    if(charCode < 48 || charCode > 58){
      e.preventDefault(); 
    }
    



  }
  

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
