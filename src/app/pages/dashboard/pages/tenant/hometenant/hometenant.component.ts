import { Component, inject } from '@angular/core';
import { AddTenantService } from '../../../../../shared/services/add-tenant.service';
import { getTenant } from '../../../../../shared/Models/Tenat';
import { Router } from '@angular/router';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hometenant',
  templateUrl: './hometenant.component.html',
  styleUrl: './hometenant.component.scss'
})
export class HometenantComponent {
visibleFilter=false
  
  pageIndex = 1;
  pageSize = 10; // اختياري حسب الـ API



  selectedFilter: string = 'FullName'; // الافتراضي مثلاً اسم المستأجر
  columnSearch:any=0
  searchText: string = ''; // النص اللي المستخدم هيكتبه
  titleSearch:string = 'اسم المستأجر'
  
show:any

fb:FormBuilder=inject(FormBuilder)
formData:any

addTenantSer:AddTenantService=inject(AddTenantService);
Toastr:ToastrService=inject(ToastrService);
getData!:any;
route:Router=inject(Router)
subScription!:Subscription
  getrelations:any;


// getDatapagination: any[] = []; // البيانات اللي جاية من الـ API

deleteId:any;


ngOnInit(){
  this.getAllData();

  this.formData=this.fb.group({
    searchData:['',Validators.required]
  })
  
}
getAllData(){
 let body ={

pageIndex: this.pageIndex,
  pageSize: this.pageSize

  }
 this.subScription=this.addTenantSer.getAllData(body).subscribe((res:any)=>{
  this.getData=res;
})
}



updateData(id:any){
  this.route.navigate(['/dashboard/tenant/addtenant'],{
    queryParams:{'id':id}
  })
}


onClose(){
  this.show=false;
}

deleteData(id:any){
  // this.addTenantSer.deleteData(id).subscribe((res:any)=>{
  //   console.log(res);
  // })
  this.show=true
  this.deleteId=id;
}

deleteConfirmed(id:any){
  // console.log(id);
 this.subScription= this.addTenantSer.deleteData(id).subscribe({
    next:(res)=>{
      this.getAllData();
      this.show=false
 this.Toastr.show('تم حذف البيانات','success');      
    },
    error:(err)=>{
      
       this.Toastr.show('لا يمكن حذف العنصر إذا كان به حركات','error'); 
    }
   })
}

onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  this.getAllData()
}


onPageSizeChanged(page:any) {
  this.pageSize=parseInt(page); // عشان يبدأ من أول صفحة
  this.getAllData(); // أو أي دالة تجيب البيانات من السيرفر
}



changeFilter(filter:string){

  
  this.selectedFilter=filter;

  this.visibleFilter=false

  console.log(this.selectedFilter);

  if(filter==='IdNumber'){
 this.titleSearch='رقم الهويه'
 this.columnSearch=1

  }else if(filter==='PhoneNumber'){
 this.titleSearch='رقم الجوال '
 this.columnSearch=2;
  }else{
     this.titleSearch='اسم المستأجر'
      this.columnSearch=0
      
  }
 console.log(this.columnSearch)

}

OnSearchText(e:any){
  this.searchText=e.target.value;
}


onSubmit(){

    const searchValue = this.formData.value.searchData?.trim(); // نحذف المسافات الزائدة
  if (!searchValue) {
    // لو فاضي، رجّع كل البيانات
    this.Toastr.show('يرجي املاء قيمه البحث','error');
    this.getAllData();
    return;
  }
  if(this.formData.valid){

    
      const body = {
      criteriaDto: {
        listRelatedObjects: [
          "string"
        ],
        entity: 'string',
        listOrderOptions: [
          "string"
        ],
        paginationInfo: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      },
      searchFilterDto: {
        column: this.columnSearch,
        value: this.formData.value.searchData
      }
    };
    this.subScription=this.addTenantSer.searchData(body).subscribe({
      next:(res:any)=>{
           this.getData = res;
        this.Toastr.show('تم البحث بنجاح','success');
      },
      error:(err)=>{
         this.Toastr.show(' قيمه البحث غير موجوده','error');
      }
    })

  }else{
       this.Toastr.show('يرجى تعبئة حقل البحث بشكل صحيح', 'error');
      this.formData.markAllAsTouched()
  }

}



ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  if(this.subScription){
    this.subScription.unsubscribe();
  }
}
 
}
