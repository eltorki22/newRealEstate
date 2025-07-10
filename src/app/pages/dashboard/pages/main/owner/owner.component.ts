import { FileUploadService } from '../../../../../shared/services/file-upload.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileRequired } from '../../../../../shared/validations/filerequired';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { OwnerService } from '../../../../../shared/services/owner.service';
import { Owners } from '../../../../../shared/Models/owners';
import { Subscription } from 'rxjs';
import { ConfirmDeleteService } from '../../../../../shared/services/confirm-delete.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.scss'
})
export class OwnerComponent {

scription!:Subscription
  // Data Api


  Owners:any;

  pageIndex = 1;
pageSize = 10; // اختياري حسب الـ API

  
 
  show=false;

  dataNationality:any=[]

  deleteId:any

  FileUploadService:FileUploadService=inject(FileUploadService)

  getDataUpdate:Owners | any;
  btnUpdate='Add';
  idUpdate:any;


  OwnerService:OwnerService=inject(OwnerService)
  toastr:ToastrService=inject(ToastrService)
    fb:FormBuilder=inject(FormBuilder);
    fileName:any='نسخه'
    selectedFile:any;

  confrimDelete:ConfirmDeleteService=inject(ConfirmDeleteService);


  dataForm=this.fb.group({
    FullName:['',Validators.required],
    Nationality:['',Validators.required],
    PhoneNumber:['',Validators.required],
    Email:['',[Validators.required,Validators.email]],
    IdType:['',Validators.required],
    IdNumber:['',Validators.required],
    idFileCopyPath:[null],
  })


  ngOnInit(){
    this.getData();
    this.getAllNationality()
    console.log(this.getDataUpdate)
  }

  validateNumber(e:any){
     const charCode = e.key.charCodeAt(0);
  if (charCode < 48 || charCode > 57) {
    e.preventDefault(); // تمنع الكتابة
  }
  }

  onFileSelected(event: any) {
    const result = this.FileUploadService.handleFileUploaded(event, this.dataForm, 'IdFileCopy');

    console.log()
    if(result){
    this.selectedFile = result.file;
    this.fileName = result.name;
    }else{
      this.selectedFile = null;
    this.fileName = '';
    }
  
}



  onSubmit(){

    if(this.dataForm.valid){
      const payload = new FormData();
      payload.append('FullName', this.dataForm.get('FullName')?.value ?? '');
      payload.append('Nationality', this.dataForm.get('Nationality')?.value ?? '');
      payload.append('PhoneNumber', this.dataForm.get('PhoneNumber')?.value ?? '');
      payload.append('Email', this.dataForm.get('Email')?.value ?? '');
      payload.append('IdType', this.dataForm.get('IdType')?.value ?? '');
      payload.append('IdNumber', this.dataForm.get('IdNumber')?.value ?? '');
    //  if (this.selectedFile) {
    //       payload.append('idFileCopyPath', this.selectedFile);
    //   }

    if (this.selectedFile && typeof this.selectedFile !== 'string') {
  payload.append('IdFileCopy', this.selectedFile);
}
      

      if(this.btnUpdate=='Add'){
        this.scription=this.OwnerService.addOwner(payload).subscribe({
          next:(res)=>{
            this.toastr.show('تم اضافه البيانات بنجاح', 'success');
            this.getData()

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

          this.dataForm.reset();
          this.fileName=''

      }else{

        this.scription=this.OwnerService.updateData(this.idUpdate,payload).subscribe((res)=>{

          this.getData();
          this.toastr.show('تم تعديل البيانات بنجاح','success');
          this.dataForm.reset()
          this.btnUpdate='Add'
          this.fileName=''
        })
      }
    }else{
      this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
      this.dataForm.markAllAsTouched()
    }

  }



  getData(){

     const body = {
    pageIndex: this.pageIndex,
    pageSize: this.pageSize
  };
   this.scription= this.OwnerService.getListData(body).subscribe((res:any)=>{

      this.Owners=res;
      // console.log(res)
    })
  }

  getAllNationality(){

    this.scription=this.OwnerService.getNationality().subscribe((res:any)=>{
      this.dataNationality=res.nationalities;

    })

  }


  getupdateData(id:any){
    this.btnUpdate='Update'

    this.idUpdate=id;

     this.scription=this.OwnerService.getupdateData(this.idUpdate).subscribe((res:any)=>{
      // debugger
       this.dataForm.patchValue({
      FullName: res.fullName,
      Nationality: res.nationality,
      PhoneNumber: res.phoneNumber,
      Email: res.email,
      IdType: res.idType,
      IdNumber: res.idNumber,
      idFileCopyPath:res.idFileCopyPath
    });



     const fullPath = res.idFileCopyPath || '';
  const extractedFileName = fullPath.split('/').pop(); // يأخذ آخر جزء بعد /


  // this.fileName = extractedFileName;
  // this.selectedFile=fullPath

  this.selectedFile = null; // لا تعيد استخدام المسار القديم
this.fileName = extractedFileName;


    })

  }


  newData(){
    this.btnUpdate='Add'
  }

  DeleteModel(id:any){
    // this.confrimDelete.confirmResult$.subscribe(())
    this.show=true;
    this.deleteId=id;
    // console.log(this.deleteId)

  }


  deleteConfirmed(id:any){
    this.toastr.show('تم حذف البيانات','success');
    this.show=false;
  
   this.scription= this.OwnerService.deleteData(id).subscribe((res)=>{
      this.getData();
    })
  }
  onClose(){
    this.show=false;
  }






onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  this.getData()
}





  ngOnDestroy(): void {
    if(this.scription){
      this.scription.unsubscribe();
    }
  }
}
