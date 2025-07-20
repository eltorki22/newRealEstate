import { Component, ElementRef, inject, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { PreviousContractService } from '../../../../../shared/services/tools/previous-contract.service';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { Router } from '@angular/router';
import { getTodayDate } from '../../../../../shared/validations/datehelpers';
import { FormBuilder, Validators } from '@angular/forms';
// import { Title } from 'chart.js';
import { Title } from '@angular/platform-browser';
// import { Modal } from 'bootstrap';

@Component({
  selector: 'app-previouscontract',
  templateUrl: './previouscontract.component.html',
  styleUrl: './previouscontract.component.scss'
})
export class PreviouscontractComponent {
visibleFilter=false


// @ViewChild('acco') acco!:ElementRef;
@ViewChildren('acco') accordions!: QueryList<ElementRef>;
render:Renderer2=inject(Renderer2);
router:Router=inject(Router)

isOpen=false;
isOpenModal=false;
dataContract:any;
toastr:ToastrService=inject(ToastrService);
activeItem: any ; // أو استخدم index لو تحب
fb:FormBuilder=inject(FormBuilder)
@ViewChild('modalRef', { static: false }) modalElementRef!: ElementRef;
pageIndex=1;
pageSize=10;
formCancel:any

title:Title=inject(Title);
// title:Title=inject(Title);
ngOnInit(): void {
  this.title.setTitle('العقودات السابقه')
this.getDataList()
this.formCancel=this.fb.group({
  TerminationDate:[getTodayDate(),Validators.required],
  Reason :['',Validators.required]
})
  
}



getDataList(){
  let pagination={
    pageIndex:this.pageIndex,
    pageSize:this.pageSize
  }
  this.sub=this.previouscontractser.getAllData(pagination).subscribe((res:any)=>{
    this.dataContract=res
  })
}

    showAcco(item: any, index: number) {
  const elements = this.accordions?.toArray();
  const element = elements?.[index]?.nativeElement;

  if (!element) return;

  // لو هو نفس العنصر المفتوح
  if (this.activeItem?.id === item.id) {
    this.render.setStyle(element, 'maxHeight', '82px');
    this.activeItem = null;
    return;
  }

  // لو عنصر جديد
  this.activeItem = item;

  setTimeout(() => {
    const scrollHeight = element.scrollHeight + 'px';
    this.render.setStyle(element, 'maxHeight', scrollHeight);
  }, 0);
}




ShowModel(){
this.isOpenModal=true;
}

searchValue: string = '';
selectedFilter: string = 'رقم العقد';
showContract=false;
sub!:Subscription;
isTermination:any;

previouscontractser:PreviousContractService=inject(PreviousContractService);

allContracts: any[] = []; // القائمة الأصلية
filteredContracts: any[] = []; // النتيجة بعد البحث

searchNumber=5
setFilter(filter: string) {
  this.selectedFilter = filter;
  this.visibleFilter=false;
}

search() {

  // if(this.f)\
  if(!this.searchValue){
    this.toastr.show('رجاء املاء قيمه البحث','error');
    return;

  }
  if(this.selectedFilter == 'رقم العقد'){
    // console.log("5");
    this.searchNumber=5
  }else if(this.selectedFilter == 'نوع العقد'){
    // console.log('6')
    this.searchNumber=6
  }

  let data={
  criteriaDto: {
    listRelatedObjects: [
      "string"
    ],
    entity: "string",
    listOrderOptions: [
      "string"
    ],
    paginationInfo: {
      pageIndex: 0,
      pageSize: 0
    }
  },
  searchFilterDto: {
    column: this.searchNumber,
    value: this.searchValue
  }
}


// console.log(this.searchValue)
  this.sub=this.previouscontractser.searchData(data).subscribe({
   next: (res:any)=>{
    this.isTermination=res.rows.isTermination
    this.dataContract=res;
    this.searchValue=''



    this.showContract=true
    
}
,error:(err)=>{
        if(err.error.errors){
          const errorFields=err.error.errors;
          for(let key in errorFields){
            const message=errorFields[key];


            message.forEach((msg:any) => {

              this.toastr.show(msg,'error');
              
            });
          }
         }else if(err.error.message){

          this.toastr.show("عقد غير موجود",'error');

         }
         else{
         
            this.toastr.show('حدث خطأ أثناء العملية', 'error');

         }
    }
})

 
}



isContractExpired(endDate: string): boolean {
  const today = new Date().setHours(0, 0, 0, 0); // اليوم بدون وقت
  const end = new Date(endDate).setHours(0, 0, 0, 0);
  return end < today;
}

renewalContract(id:any){

  this.router.navigate(['dashboard/contractrenewal'],{
    queryParams:{id:id}
  });

}


get getToday(){
  return getTodayDate();
}


cancelId:any
setIdCancel(id:any){
  console.log(id);
  this.cancelId=id;
}


isActive=false;
onCancel(){
  if(this.formCancel.valid){

  const formDataCancel=new FormData();


  formDataCancel.append('ContractId',this.cancelId);
  formDataCancel.append('TerminationDate',this.formCancel.get('TerminationDate').value);
  formDataCancel.append('Reason',this.formCancel.get('Reason').value);
  
  this.sub=this.previouscontractser.contractCancel(formDataCancel).subscribe({
    next:(res:any)=>{
      
    

   this.toastr.show('تم  فسخ العقد بنجاح','success');

   location.reload();

  (this.render.selectRootElement(this.modalElementRef.nativeElement) as HTMLElement).click();
    },error:(err)=>{

        if(err.error.errors){
          const errorFields=err.error.errors;
          for(let key in errorFields){
            const message=errorFields[key];


            message.forEach((msg:any) => {

              this.toastr.show(msg,'error');
              
            });
          }
         }else if(err.error.message){
          this.toastr.show(err.error.message,'error');
         }
         else{
         
            this.toastr.show('حدث خطأ أثناء العملية', 'error');

         }
          
    }
  })
// 
  }else{
    this.formCancel.markAllAsTouched();
      this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
  }

}


ngOnDestroy(): void {
  if(this.sub){
    this.sub.unsubscribe();
  }
}


onPageChanged(page:any){
  this.pageIndex=page;
  this.getDataList();
}


}
