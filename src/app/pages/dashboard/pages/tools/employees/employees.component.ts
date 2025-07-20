import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadService } from '../../../../../shared/services/file-upload.service';
import { EmployeesService } from '../../../../../shared/services/tools/employees.service';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

  fb:FormBuilder=inject(FormBuilder)
  fileUploadedSer:FileUploadService=inject(FileUploadService);
  employeesSer:EmployeesService=inject(EmployeesService);
  pageIndex = 1;
  pageSize=10;
  employeeForm:any
  getAllData:any
  btnText='Add';
   selectedFile: File | null = null;
   fileName:any='نسخه'
   nationality:any;
   toastr:ToastrService=inject(ToastrService);
   subScription!:Subscription
   idUpdate:any
    title:Title=inject(Title);
   ngOnInit(): void {

    this.title.setTitle('الموظفين')
    this.employeeForm = this.fb.group({
      fullName: ['', Validators.required],
      nationality: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      idType: ['', Validators.required],
      idNumber: ['', Validators.required],
      salary: ['', [Validators.required]],
      idFileCopy: [null] // we'll patch this manually
    });

    this.getNationality();
    this.getAllDataList();
  }



   onFileSelected(event: any) {
    const result = this.fileUploadedSer.handleFileUploaded(event, this.employeeForm, 'IdFileCopy');

    console.log()
    if(result){
    this.selectedFile = result.file;
    this.fileName = result.name;
    }else{
      this.selectedFile = null;
    this.fileName = '';
    }
  
}



  validationNumber(e:any){

    const charCode=e.key.charCodeAt(0);

    if(charCode < 48 || charCode  > 57){
      e.preventDefault();
    }



  }

onSubmit(){

  
  if(this.employeeForm.valid){

    var payload=new FormData();


    payload.append('fullName',this.employeeForm.get('fullName').value);
    payload.append('nationality',this.employeeForm.get('nationality').value);
    payload.append('phoneNumber',this.employeeForm.get('phoneNumber').value);
    payload.append('email',this.employeeForm.get('email').value);
    payload.append('idType',this.employeeForm.get('idType').value);
    payload.append('idNumber',this.employeeForm.get('idNumber').value);
    payload.append('salary',this.employeeForm.get('salary').value);

    if(this.selectedFile){
      payload.append('IdFileCopy',this.selectedFile);
    }
    if(this.btnText == 'Add'){


      this.subScription=this.employeesSer.addData(payload).subscribe({
        next:(res:any)=>{
             this.getAllDataList();
            this.toastr.show('تم اضافه البيانات بنجاح', 'success');
         
// this.selectedFile='';
this.fileName='';
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




      

    }else{
      this.subScription=this.employeesSer.updateData(this.idUpdate,payload).subscribe((res:any)=>{
              this.getAllDataList();
          this.toastr.show('تم تعديل البيانات بنجاح','success');
   
          this.btnText='Add'
      })
    }

    this.employeeForm.reset();   

  }else{
    //  this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
    this.employeeForm.markAllAsTouched();
  }

}


getNationality(){

  this.employeesSer.getNationality().subscribe((res:any)=>{
    this.nationality=res.nationalities
    // console.log(this.nationality);
  })
  
}


getAllDataList(){
  let pagination={
    pageIndex:this.pageIndex,
    pageSize:this.pageSize,
  }
  this.employeesSer.getDataAllList(pagination).subscribe((res:any)=>{
    this.getAllData={
      paginationInfo:res.paginationInfo,
      rows:res.rows.map((item:any)=>{
      return {
        id:item.id,
        fullName:item.fullName,
        phoneNumber:item.phoneNumber,
        idNumber:item.idNumber,
        salary:item.salary
      }
    })

    }


  })
}



onPageChanged(page:number){

  this.pageIndex=page;
  this.getAllDataList();

}


ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  if(this.subScription){
    this.subScription.unsubscribe();
  }
}


getUpdateData(id:any){
  console.log(id);
      this.btnText='Update'
    this.idUpdate=id;
  this.subScription=this.employeesSer.getUpdateData(id).subscribe((res:any)=>{

    this.employeeForm.patchValue({
        fullName: res.fullName,
      nationality: res.nationality,
      phoneNumber: res.phoneNumber,
      email: res.email,
      idType: res.idType,
      idNumber: res.idNumber,
      salary: res.salary,
      idFileCopy: res.idFileCopyPath
    })

    this.fileName=res.idFileCopyPath.split('/').pop()


  //  console.log(res);
  // this.employeeFor
  })

}

show=false;
deleteId:any

onClose(){
  this.show=false
}


deleteModel(id:any){
  this.deleteId=id;
  this.show=true;

}

deleteConfirmed(id:any){
this.subScription=this.employeesSer.deleteData(id).subscribe((res)=>{
   this.toastr.show('تم حذف البيانات','success');
    this.show=false
    this.getAllDataList();
})
}



}
