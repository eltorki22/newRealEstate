import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddTenantService } from '../../../../../shared/services/add-tenant.service';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { FileUploadService } from '../../../../../shared/services/file-upload.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrl: './add-tenant.component.scss'
})
export class AddTenantComponent {

  fb:FormBuilder=inject(FormBuilder);
  addTenantSer:AddTenantService=inject(AddTenantService)
  toastr:ToastrService=inject(ToastrService);
  getNationality:any;
  FileUploadService:FileUploadService=inject(FileUploadService);
  subScription!:Subscription
  activeRouter:ActivatedRoute=inject(ActivatedRoute)
  route:Router=inject(Router)
  isEditMode=true;
  editIndex: number | null = null;


  idUpdate:any

  selectedFile=null
  fileName='نسخه'

  formData=this.fb.group({
    FullName :['',[Validators.required]],
    Nationality  :['',[Validators.required]],
    PhoneNumber  :['',[Validators.required]],
    Email  :['',[Validators.required,Validators.email]],
    JobTitle   :['',[Validators.required]],
    IdType :['',[Validators.required]],
    IdNumber :['',[Validators.required]],
    IdFileCopy:[null] ,
  })


  dependents: any[] = [];
//   dependentForm = this.fb.group({
//   fullName: [''],
//   idOrPassport: [''],
//   nationality: [''],
//   phoneNumber: [''],
//   relation: ['']
// });
dependentForm = this.fb.group({
  fullName: ['', Validators.required],
  idOrPassport: ['', Validators.required],
  nationality: ['', Validators.required],
  phoneNumber: ['', Validators.required],
  relation: ['', Validators.required]
});

  
saveDependent() {
  if (this.dependentForm.valid) {
    const dependentData = this.dependentForm.value;

    if (this.editIndex !== null) {
      // تعديل
      this.dependents[this.editIndex] = dependentData;
      this.toastr.show("تم تعديل بيانات المرافق", "success");
      this.editIndex = null;
    } else {
      // إضافة
      this.dependents.push(dependentData);
      this.toastr.show("تم إضافة المرافق بنجاح", "success");
    }

    this.dependentForm.reset();
  } else {
    this.dependentForm.markAllAsTouched();
    this.toastr.show("يرجى ملء بيانات المرافق بشكل صحيح", "error");
  }
}


editDependent(index: number) {
  const dep = this.dependents[index];
  this.dependentForm.patchValue(dep);
  this.editIndex = index;
}

deleteDependent(index: number) {
  this.dependents.splice(index, 1); // حذف المرافق من المصفوفة
  this.toastr.show("تم حذف المرافق بنجاح", "success");

  // لو كان بيعدل نفس العنصر، نرجّع النموذج للوضع العادي
  if (this.editIndex === index) {
    this.dependentForm.reset();
    this.editIndex = null;
  }
}







  ngOnInit(){
    this.getAllNationality();
    this.subScription=this.activeRouter.queryParamMap.subscribe((param:any)=>{
      const id=parseInt(param.get('id'))
      if(id){
        this.idUpdate=id;
        this.isEditMode=false;
      this.addTenantSer.getupdateData(id).subscribe((res:any)=>{

        console.log(res)
          this.formData.patchValue({
               FullName :res.fullName,
             Nationality  :res.nationality,
               PhoneNumber  :res.phoneNumber,
              Email  :res.email,
              JobTitle   :res.jobTitle,
              IdType :res.idType,
              IdNumber :res.idNumber,
            IdFileCopy:res.idFileCopyPath,
          })
          this.fileName=res.idFileCopyPath?.split('/').pop() ?? ''

          // this.selectedFile=;
      })   


      
      }
     
    })


    this.getRelations();
    
  }


  

  getAllNationality(){

    this.addTenantSer.getAllNationality().subscribe((res:any)=>{
      this.getNationality=res.nationalities
      console.log(res.nationalities)
    })
    
  }
  

  validationNumber(e:any){
    const charCode = e.key.charCodeAt(0);

    if(charCode < 48 || charCode > 57){
       e.preventDefault();
    }

  }


  onSubmit() {
  // أولاً: علم كل الحقول إنها "لمست"

  
  this.formData.markAllAsTouched();

   const payload = new FormData();
  payload.append('FullName', this.formData.get('FullName')?.value ?? '');
  payload.append('Nationality', this.formData.get('Nationality')?.value ?? '');
  payload.append('PhoneNumber', this.formData.get('PhoneNumber')?.value ?? '');
  payload.append('Email', this.formData.get('Email')?.value ?? '');
  payload.append('JobTitle', this.formData.get('JobTitle')?.value ?? '');
  payload.append('IdType', this.formData.get('IdType')?.value ?? '');
  payload.append('IdNumber', this.formData.get('IdNumber')?.value ?? '');

  if (this.selectedFile) {
    payload.append('IdFileCopy', this.selectedFile);
  }

  // تحقق من الصحة
  if (this.formData.invalid) {
    this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
    return;
  }

 
 payload.append('Dependents', JSON.stringify(this.dependents));

  if(this.isEditMode){
 this.subScription = this.addTenantSer.addData(payload).subscribe({
    next: () => {
      this.toastr.show('تم اضافه البيانات بنجاح', 'success');
      this.formData.reset();
      this.dependents=[];
      this.fileName = 'نسخه';
    },
    error: (err) => {
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
  });
  }else{
    this.subScription=this.addTenantSer.updateData(this.idUpdate,payload).subscribe((res)=>{
        //  this.getData();
          this.toastr.show('تم تعديل البيانات بنجاح','success');
          this.formData.reset()
          this.isEditMode=true
          this.route.navigate(['/dashboard/tenant/hometenant']);
    })
  }
 
}


  onFileSelected(e:any){
    const result = this.FileUploadService.handleFileUploaded(e, this.formData, 'IdFileCopy');
    if(result){
    this.selectedFile = result.file;
    this.fileName = result.name;
    }else{
      this.selectedFile = null;
      this.fileName = '';
    }

 
  }

    getrelations:any;



      getRelations(){
   this.subScription= this.addTenantSer.getRelations().subscribe((res:any)=>{

      this.getrelations=res.relations.map((item:any)=>{
         return {
        id:item.id,
        relation_ar:item.relation_ar
      }
      })
      
    })
  }


  
}
