import { FileUploadService } from '../../../../../shared/services/file-upload.service';
import { Subscription } from 'rxjs';
import { RealtorService } from '../../../../../shared/services/realtor.service';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Owners } from '../../../../../shared/Models/owners';
import { Realtor } from '../../../../../shared/Models/realtor';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-realtor',
  templateUrl: './realtor.component.html',
  styleUrl: './realtor.component.scss'
})
export class RealtorComponent {

  // Api


  
  pageIndex = 1;
pageSize = 10; // اختياري حسب الـ API

  
  

  RealtorService:RealtorService=inject(RealtorService);
  FileUploadService:FileUploadService=inject(FileUploadService)
  subscription!:Subscription
  getAllData:any;
  getAllNationality:any=[];
  fb:FormBuilder=inject(FormBuilder);
  toastr:ToastrService=inject(ToastrService)
  selectedFile:any;
  fileName:string='نسخه'
  btnText='Add';
  idUpdate:any

  show=false;
  @ViewChild('inpBouns') inpBouns!:ElementRef

  formData=this.fb.group({
    fullName:['',[Validators.required]],
    nationality:['',[Validators.required]],
    phoneNumber:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    idType:['',[Validators.required]],
    idNumber:['',[Validators.required]],
    idFileCopyPath:[null],
    bonusType: ['value'] // ← أضف ده للفورم
  })
  

  title:Title=inject(Title);

  ngOnInit(){
    this.title.setTitle('السمسار')
    this.getListData();
    this.getNationality();
  }


  onFileSelected(e:any){

    const result=this.FileUploadService.handleFileUploaded(e,this.formData,'idFileCopyPath');

    if(result){
      this.selectedFile=result.file;
      this.fileName=result.name;
      
    }else{
      this.selectedFile=null;
      this.fileName='';
    }
  

  }

 bonusErrorMessage = ''; // reset message
 valueBouns:any
 percentageBouns:any

  validationBouns(e:any){
    let placeholder=e.target.placeholder;
    let value=e.target.value;
    if(placeholder == 'قيمه'){

           const regex=/^\d+$/;
      if(!value){
        this.bonusErrorMessage='القيمه مطلوبه';
      }else if(!regex.test(value)){
        this.bonusErrorMessage='القيمة يجب أن تكون أرقام فقط';
      }else{
        this.bonusErrorMessage=''
        this.valueBouns=value
      }


    }else if(placeholder == 'نسبه'){
         const regex = /^\d{1,3}$/;
      if(!value){
        this.bonusErrorMessage='النسبه مطلوبه';
      }else if(!regex.test(value)){
        
        this.bonusErrorMessage='النسبه يجب أن تكون أرقام فقط';
      }else{
        this.bonusErrorMessage=''
        this.percentageBouns=value
      }



    }


  }

  onSubmit(){
           if(this.inpBouns.nativeElement.value == ''){
      this.inpBouns.nativeElement.focus();
    }
    if(this.formData.valid && this.bonusErrorMessage == ''){
        let payload=new FormData()
        payload.append('fullName',this.formData.value.fullName ?? '')
        payload.append('nationality',this.formData.value.nationality ?? '')
        payload.append('phoneNumber',this.formData.value.phoneNumber ?? '')
        payload.append('email',this.formData.value.email ?? '')
        payload.append('idType',this.formData.value.idType ?? '')
        payload.append('idNumber',this.formData.value.idNumber ?? '')
       if (this.selectedFile) {
       payload.append('IdFileCopy', this.selectedFile);
}
const bonusType = this.formData.get('bonusType')?.value;

if (bonusType === 'value') {
  payload.append('CommissionType','true');
  payload.append('CommissionAmount', this.valueBouns || '0');
  payload.append('commissionPercentage', '0');
} else if (bonusType === 'rate') {
  payload.append('CommissionType','false');
  payload.append('commissionAmount', '0');
  payload.append('commissionPercentage', this.percentageBouns || '0');
}
        
      if(this.btnText=='Add'){
 
      


      this.subscription=  this.RealtorService.addData(payload).subscribe({
             next:(res:any)=>{
            this.toastr.show('تم اضافه البيانات بنجاح', 'success');
            this.getListData();

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
         }else if(err.error.message){
          this.toastr.show(err.error.message, 'error');
         }
         else{
         
            this.toastr.show('حدث خطأ أثناء العملية', 'error');

         }
          }
        })


        // this.formData.reset();
    
        


      }else{


        this.subscription=this.RealtorService.updateData(this.idUpdate,payload).subscribe((res:any)=>{
          this.getListData()
        })
       

        // this.formData.reset()


          this.formData.get('idFileCopyPath')?.clearValidators();
          this.formData.get('idFileCopyPath')?.updateValueAndValidity();

      
          this.btnText='Add'

      }

          this.formData.reset({
               bonusType: this.formData.get('bonusType')?.value // 👈 حافظ على القيمة الحالية
        });
        this.bonusErrorMessage='';
        this.valueBouns='';
        this.percentageBouns='';
        this.fileName = 'نسخه';
        this.selectedFile=null
        this.inpBouns.nativeElement.value='';
      
    }else{

      

      this.formData.markAllAsTouched();
      // this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
    }

  }

  resetData(){
    this.btnText='Add';
    this.formData.reset();
  this.formData.patchValue({
    bonusType: 'value' // القيمة الافتراضية
  });

  this.fileName = 'نسخه';
  this.selectedFile = null;
  this.inpBouns.nativeElement.value = '';
  }

  markAsFileTouched(){
    this.formData.controls['idFileCopyPath'].markAsTouched();
  }

  validateNumber(e:any){
       const charCode = e.key.charCodeAt(0);
  if (charCode < 48 || charCode > 57) {
    e.preventDefault(); // تمنع الكتابة
  }

  }

  getListData(){
      const body = {
    pageIndex: this.pageIndex,
    pageSize: this.pageSize
  };
    this.subscription=this.RealtorService.getListData(body).subscribe((res:any)=>{
      this.getAllData=res;
    
    })
  }


  getNationality(){
    this.subscription=this.RealtorService.getNationality().subscribe((res:any)=>{
      this.getAllNationality=res.nationalities
    })
  }




  getDataUpdate(id:any){
    this.idUpdate=id;
    this.btnText='Update';

     this.subscription= this.RealtorService.getUpdateData(this.idUpdate).subscribe((res:any)=>{
          this.formData.patchValue({
      fullName:res.fullName,
       nationality:res.nationality,
       phoneNumber:res.phoneNumber,
        email:res.email,
        idType:res.idType,
        idNumber:res.idNumber,
        bonusType:res.commissionAmount > 0 ? 'value' : 'rate',
        idFileCopyPath:res.idFileCopyPath

          })





          if(res.commissionAmount > 0){
            this.inpBouns.nativeElement.value=res.commissionAmount
          
          }else if(res.commissionPercentage){
              this.inpBouns.nativeElement.value=res.commissionPercentage
          }


const bonusType = this.formData.get('bonusType')?.value;          
if (bonusType === 'value') {
  this.valueBouns=res.commissionAmount
 
} else if (bonusType === 'rate') {
  this.percentageBouns=res.commissionPercentage

}

             const fullPath = res.idFileCopyPath || ''; 
            const extractedFileName = fullPath.split('/').pop(); // يأخذ آخر جزء بعد /


            this.fileName = extractedFileName;
              this.selectedFile=fullPath
       
        })

     


  }

  deleteId:any


  DeleteModel(id:any){
    this.deleteId=id;
    this.show=true
  }

   deleteConfirmed(id:any){
  
  
    this.show=false;
    this.RealtorService.deleteData(id).subscribe({
    next:(res)=>{
      this.getListData();
 this.toastr.show('تم حذف البيانات','success');      
    },
    error:(err)=>{
      
       this.toastr.show('لا يمكن حذف العنصر إذا كان به حركات','error'); 
    }
   })
  }
  onClose(){
    this.show=false;
  }
  
onPageChanged(page: number) {
  this.pageIndex = page;
  this.getListData()
}

  ngOnDestroy(): void {

    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
