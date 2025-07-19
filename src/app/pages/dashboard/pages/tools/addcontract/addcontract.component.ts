import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadService } from '../../../../../shared/services/file-upload.service';
import { AddContractService } from '../../../../../shared/services/tools/add-contract.service';
import { MsgForm } from '../../../../../shared/Models/msg-form';
import { BuildingService } from '../../../../../shared/services/building.service';
import { UnitService } from '../../../../../shared/services/unit.service';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { getTodayDate } from '../../../../../shared/validations/datehelpers';
import { AccountsService } from '../../../../../shared/services/tools/accounts.service';
import { RealtorService } from '../../../../../shared/services/realtor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addcontract',
  templateUrl: './addcontract.component.html',
  styleUrl: './addcontract.component.scss'
})
export class AddcontractComponent {
  activeRoute:ActivatedRoute=inject(ActivatedRoute);
  fb:FormBuilder=inject(FormBuilder);
  fileUploadedServices:FileUploadService=inject(FileUploadService);
  addContractser:AddContractService=inject(AddContractService)
  accountser:AccountsService=inject(AccountsService);
  realtorser:RealtorService=inject(RealtorService);
  getAllMessage:MsgForm[]=[];
  unitSer:UnitService=inject(UnitService)
  accountCompany:any;
  nameRealtor:any
  subScription:any;
  building:BuildingService=inject(BuildingService);
  Unit:UnitService=inject(UnitService);
  toastr:ToastrService=inject(ToastrService);
  getDataBuilding:any=[]
  getDataUnit1:any=[]

  renwalId:any


  selectedFile:any
  fileName:any='نسخه';

  formData=this.fb.group({
    ContractNumber:['',Validators.required],
    ContractType:['',Validators.required],
    ContractAddress:['',Validators.required],
    ContractDate:[getTodayDate(),Validators.required],
    StartDate:[getTodayDate(),Validators.required],
    EndDate:[this.getOneYearFromToday(),Validators.required],
    ReferenceName:[''],
    ContractFile:[null],
    ContractNotes:[''],
    TotalAmount:['0',Validators.required],
    PaidAmount:['',Validators.required],
    RemainingAmount:["0",Validators.required],
    CommissionValue:['0',Validators.required],
    CommissionPaid:['',Validators.required],
    CommissionRemaining:['0',Validators.required],
    ReminderDaysBeforeDue:['',Validators.required],
    InsuranceValue:['',Validators.required],
    UnitId:[null,Validators.required],
    OwnerId:[null],
    TenantId:[null],
    BrokerId :[null],
    AccountDebitForCompanyId:[null,Validators.required],
    AccountCreditForCompanyId:[null,Validators.required],

    

    

    MessageId:['',Validators.required],
    PhoneNumber:['',Validators.required],
    MessageType:['0',Validators.required]
  })

  
  getOneYearFromToday() {
  const today = new Date();
  const nextYear = new Date(today);
  nextYear.setFullYear(today.getFullYear() + 1);

  // ترجع التاريخ بصيغة YYYY-MM-DD المناسبة لـ input[type="date"]
  return nextYear.toISOString().split('T')[0];
}

    formDataOwner:any
    ngOnInit(){
        this.formDataOwner=this.fb.group({
        email:[''],
        fullNameOwner:[''], 
        id:[''],
        idFileCopyPath:[''] ,
        idNumber:[''], 
        idType:[''],
        nationality: [''],
        phoneNumber: ['']
      })

      this.getAllMessageName();
      this.getBuilding();
      this.getUnitData();
      this.getAccountName();
      this.getrealtorName();

      this.formData.get('TotalAmount')?.valueChanges.subscribe(() => {
      this.calculateRemaining();
    });

    this.formData.get('PaidAmount')?.valueChanges.subscribe(() => {
      this.calculateRemaining();
    });
      this.formData.get('CommissionValue')?.valueChanges.subscribe(() => {
      this.calculatecommition();
    });

    this.formData.get('CommissionPaid')?.valueChanges.subscribe(() => {
      this.calculatecommition();
    });
    
    }


    calculatecommition(){
     let total=Number(this.formData.get('CommissionValue')?.value);
     let paid=Number(this.formData.get('CommissionPaid')?.value)


     let remaining= total - paid;

      this.formData.get('CommissionRemaining')?.patchValue(remaining.toString());

    }

    calculateRemaining(){
      const total = Number(this.formData.get('TotalAmount')?.value) || 0;
    const paid = Number(this.formData.get('PaidAmount')?.value) || 0;
    const remaining = total - paid;
      this.formData.get('RemainingAmount')?.patchValue(remaining.toString());
    }



    onSubmit(){

      if(this.formData.valid){

      const formData = new FormData();

    // Add string and number fields
    formData.append('ContractNumber', this.formData.get('ContractNumber')?.value ?? '');
    formData.append('ContractType', this.formData.get('ContractType')?.value ?? '') ;
    formData.append('ContractDate', this.formData.get('ContractDate')?.value ?? '');
    formData.append('ContractAddress', this.formData.get('ContractAddress')?.value ?? '');
    formData.append('StartDate', this.formData.get('StartDate')?.value ?? '');
    formData.append('EndDate', this.formData.get('EndDate')?.value ?? '');
    formData.append('ReferenceName', this.formData.get('ReferenceName')?.value ?? '');  
    formData.append('ContractNotes', this.formData.get('ContractNotes')?.value ?? '');
    if(this.selectedFile){
      formData.append('ContractFile',this.selectedFile);
    }

      formData.append('TotalAmount', this.formData.get('TotalAmount')?.value ?? '');
      formData.append('PaidAmount', this.formData.get('PaidAmount')?.value ?? '');
      formData.append('RemainingAmount', this.formData.get('RemainingAmount')?.value ?? '');
      formData.append('CommissionValue', this.formData.get('CommissionValue')?.value ?? '');
      formData.append('CommissionPaid', this.formData.get('CommissionPaid')?.value ?? '');
      formData.append('CommissionRemaining', this.formData.get('CommissionRemaining')?.value ?? '');
      formData.append('ReminderDaysBeforeDue', this.formData.get('ReminderDaysBeforeDue')?.value ?? '');
      formData.append('InsuranceValue', this.formData.get('InsuranceValue')?.value ?? '');
      formData.append('PhoneNumber', this.formData.get('PhoneNumber')?.value ?? '');
      formData.append('MessageId', this.formData.get('MessageId')?.value ?? '');
      
      formData.append('UnitId', this.formData.get('UnitId')?.value ?? '');
      formData.append('TenantId', this.formData.get('TenantId')?.value ?? '');
      formData.append('OwnerId', this.formData.get('OwnerId')?.value ?? '');
      formData.append('BrokerId', this.formData.get('BrokerId')?.value ?? '');
      formData.append('AccountDebitForCompanyId', this.formData.get('AccountDebitForCompanyId')?.value ?? '');
      formData.append('AccountCreditForCompanyId', this.formData.get('AccountCreditForCompanyId')?.value ?? '');

      formData.append('MessageType', this.formData.get("MessageType")?.value ?? '');
  


  
  
    
    






        this.subScription=this.addContractser.addContract(formData).subscribe({
          next:(res:any)=>{
                  this.toastr.show('تم اضافه البيانات بنجاح', 'success');
                  this.showTenant=false;
                  this.showOwner=false;
                  this.showBroker=false;
                  this.fileName='نسخه'


                  document.querySelectorAll('.searchVal').forEach(val=>{
                    (val as HTMLInputElement).value='';
                  })

                   this.formData.reset({

                    ContractDate:this.formData.get('ContractDate')?.value,
                    StartDate:this.formData.get('StartDate')?.value ,
                    EndDate:this.formData.get('EndDate')?.value

        });
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
            this.toastr.show(err.error.message, 'error');
          }
          else{

            console.log(err);
          
              this.toastr.show('حدث خطأ أثناء العملية', 'error');

          }

          }
        })

       
      }else{
          // this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
        this.formData.markAllAsTouched();
      }

    }


    getAllMessageName(){
    this.subScription= this.addContractser.getAllContactMessage().subscribe((res:any)=>{
        this.getAllMessage=res.rows;
      })
    }


    onFileSelected(e:any){
      const result = this.fileUploadedServices.handleFileUploaded(event, this.formData, 'IdFileCopy');
      if(result){
      this.selectedFile = result.file;
      this.fileName = result.name;
      }else{
        this.selectedFile = null;
      this.fileName = '';
      }
    }


    markFileAsTouced(){

      this.formData.controls['ContractFile']?.markAsTouched()
      
    }




    
    getBuilding(){
    this.subScription= this.building.getDataList().subscribe((res:any)=>{
      this.getDataBuilding=res.rows.map((item:any)=>{
        return {
          id:item.id,
          name:item.name
        }
      });
      // console.log(this.getDataBuilding);
    })
    }


    getUnitData(){
      let pagination={
        pageIndex:0,
        PageSize:0
      }
      this.subScription=this.Unit.getAllListData(pagination).subscribe((res:any)=>{
        
          this.getDataUnit1=res.rows.map((item:any)=>{
            return {
              id:item.id,
              unitName:item.unitName,
              price:item.price
            }
          })
      })
    }


    priceUnit:any
    commationUnit:any

    changeUnit(e:any){
      // console.log(e.target.value);
      this.subScription=this.unitSer.getUpdateData(e.target.value).subscribe((res:any)=>{
        // console.log(res.price);
      this.priceUnit=res.price

      console.log(res);
      
 const price = Number(this.priceUnit) || 0;
const commissionPercentage = Number(this.commationUnit) || 0;

const commission = (price * commissionPercentage) / 100;



  this.formData.patchValue({
    CommissionValue:commission.toFixed(2),
    
  });

      this.formData.patchValue({
        TotalAmount:res.price
      })

      this.calculatecommition()
    })

  }

  getSearchOwner:any=[];

  showOwner=false;

  ownerModel = {
  email:'',
      fullName:'', 
      id:null,
      idFileCopyPath:'' ,
      idNumber:'', 
      idType:'',
      nationality: '',
      phoneNumber: '',
};

  searchOwner(val:any){

    if(!val){
      this.showOwner=false;
      this.toastr.show('رجاء املاء قيمه البحث الخاصه بالمالك','error');
      return ;
    }

 
    let value={
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
    column: this.columnSearchOwner,
    value: val
  }
}


  
    this.subScription=this.addContractser.searchOwner(value).subscribe({
      next:(res:any)=>{
       
this.showOwner=true
const owner = res.rows[0];

    this.formData.patchValue({
      OwnerId:res.rows[0].id
    })
this.ownerModel.fullName=owner.fullName
this.ownerModel.phoneNumber=owner.phoneNumber
this.ownerModel.nationality=owner.nationality
this.ownerModel.email=owner.email
this.ownerModel.idType=owner.idType
this.ownerModel.idNumber=owner.idNumber
this.ownerModel.idFileCopyPath=owner.idFileCopyPath
      
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

          this.toastr.show("اسم المالك غير موجود",'error');


         }
         else{
         
            this.toastr.show('حدث خطأ أثناء العملية', 'error');

         }
        
  }
    })


  }



tenantModel={
      email:'',
      fullName:'', 
      id:null,
      idFileCopyPath:'' ,
      idNumber:'', 
      idType:'',
      nationality: '',
      phoneNumber: '',
      dependents:[]
}


showTenant=false
  searchTenant(val:any){

        if(!val || val.trim().length === 0){
      this.showTenant=false;
      this.toastr.show('رجاء املاء قيمه البحث الخاصه بالمستأجر','error');
      return ;
    }
    let value={
  criteriaDto: {
    listRelatedObjects: [
   "   string"
    ],
    entity: "string",
    listOrderOptions: [
   "   string"
    ],
    paginationInfo: {
      pageIndex: 0,
      pageSize: 0
    }
  },
  searchFilterDto: {
    column: this.columnSearchTenant,
    value: val
  }
}




  this.subScription = this.addContractser.searchTenant(value).subscribe({
    next:(res:any)=>{
    console.log(res);
    this.showTenant=true;
    let tenant=res.rows[0];

    this.tenantModel.dependents=tenant.dependents;



this.tenantModel.fullName=tenant.fullName
this.tenantModel.id=tenant.id;
this.tenantModel.phoneNumber=tenant.phoneNumber
this.tenantModel.nationality=tenant.nationality
this.tenantModel.email=tenant.email
this.tenantModel.idType=tenant.idType
this.tenantModel.idNumber=tenant.idNumber
this.tenantModel.idFileCopyPath=tenant.idFileCopyPath.split('/').pop() ?? ''
this.tenantModel.dependents=tenant.dependents




this.formData.patchValue({
  TenantId:tenant.id
})


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

          this.toastr.show("اسم المستأجر غير موجود",'error');

         }
         else{
         
            this.toastr.show('حدث خطأ أثناء العملية', 'error');

         }
    }
  
  })
  }



  brokerModel={
    email:'', 
fullName:'', 
id: '',
idFileCopyPath: "",
idNumber: '',
idType: '',
nationality: '',
phoneNumber: '',
  }

  showBroker=false;
  searchBroker(val:any){

        if(!val){
          this.showBroker=false;
      this.toastr.show('رجاء املاء قيمه البحث الخاصه بالسمسار','error');
      return ;
    }

   let value= {
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
    column: this.columnSearchBroker,
    value: val
  }
}



    this.subScription=this.addContractser.searchBroker(value).subscribe({
     next: (res:any)=>{
      console.log(res.rows);
      let broker=res.rows[0];
      this.showBroker=true;

      console.log(broker);
      
this.brokerModel.fullName=broker.fullName
this.brokerModel.id=broker.id;
this.brokerModel.phoneNumber=broker.phoneNumber
this.brokerModel.nationality=broker.nationality
this.brokerModel.email=broker.email
this.brokerModel.idType=broker.idType
this.brokerModel.idNumber=broker.idNumber
this.brokerModel.idFileCopyPath=broker.idFileCopyPath.split('/').pop() ?? ''


 const price = Number(this.priceUnit) || 0;
const commissionPercentage = Number(broker.commissionPercentage) || 0;

const commission = (price * commissionPercentage) / 100;


this.commationUnit=broker.commissionPercentage

  this.formData.patchValue({
    CommissionValue:commission.toFixed(2),
    BrokerId:broker.id, 
  });

  this.calculatecommition()






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

          this.toastr.show("اسم السمسار غير موجود",'error');

         }
         else{
         
            this.toastr.show('حدث خطأ أثناء العملية', 'error');

         }
}
    })
  }


  getAccountName(){
    let pagination={
      pageIndex:0,
      pageSize:0
    }
    this.subScription=this.accountser.getAllDataList(pagination).subscribe((res:any)=>{
      // console.log(res);
      this.accountCompany=res.rows.map((item:any)=>{
        return {
          id:item.id,
          accountName:item.accountName
        }
      });
      
    })
  }


  getrealtorName(){
        let pagination={
      pageIndex:0,
      pageSize:0
    }
    this.subScription=this.realtorser.getListData(pagination).subscribe((res:any)=>{
      console.log(res);
      this.nameRealtor=res.rows.map((item:any)=>{

        return {
          id:item.id,
          fullName:item.fullName
        }

      })

      // console.log(this.nameRealtor);
      
    })
  }


  onPrint(){
     const contractData = this.formData.value;


     if(this.formData.valid){ 
      
      const printContent = `
    <html dir="rtl">
      <head>
        <title>طباعة العقد</title>
        <style>
          body { font-family: Arial, sans-serif; direction: rtl; padding: 20px; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          td, th { border: 1px solid #000; padding: 8px; }
        </style>
      </head>
      <body>
        <h2>تفاصيل العقد</h2>
        <table>
          <tr><th>رقم العقد</th><td>${contractData.ContractNumber}</td></tr>
          <tr><th>نوع العقد</th><td>${contractData.ContractType}</td></tr>
          <tr><th>العنوان</th><td>${contractData.ContractAddress}</td></tr>
          <tr><th>تاريخ الإبرام</th><td>${contractData.ContractDate}</td></tr>
          <tr><th>البداية</th><td>${contractData.StartDate}</td></tr>
          <tr><th>النهاية</th><td>${contractData.EndDate}</td></tr>
          <tr><th>المبلغ الإجمالي</th><td>${contractData.TotalAmount}</td></tr>
          <tr><th>المدفوع</th><td>${contractData.PaidAmount}</td></tr>
          <tr><th>المتبقي</th><td>${contractData.RemainingAmount}</td></tr>
          <tr><th>العمولة</th><td>${contractData.CommissionValue}</td></tr>
          <tr><th>المدفوع عمولة</th><td>${contractData.CommissionPaid}</td></tr>
          <tr><th>المتبقي عمولة</th><td>${contractData.CommissionRemaining}</td></tr>
          <tr><th>التأمين</th><td>${contractData.InsuranceValue}</td></tr>
          <tr><th>الملاحظات</th><td>${contractData.ContractNotes || '---'}</td></tr>
        </table>
      </body>
    </html>
  `;

  const printWindow = window.open('__', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  } else {
    // alert('');
    this.toastr.show('تعذر فتح نافذة الطباعة.','error')
  }


     }else{
      this.formData.markAllAsTouched();
      this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
     }

      
  }


   selectedFilterTenant: string = 'FullName'; // الافتراضي مثلاً اسم المستأجر
  columnSearchTenant:any=0
  searchTextTenant: string = ''; // النص اللي المستخدم هيكتبه
  titleSearchTenant:string = 'اسم المستأجر'
  
show:any

visibleFilter=false;




changeFilter(filter:string){

  
  this.selectedFilterTenant=filter;

  this.visibleFilter=false

  console.log(this.selectedFilterTenant);

  if(filter==='IdNumber'){
 this.titleSearchTenant='رقم الهويه'
 this.columnSearchTenant=1

  }else if(filter==='PhoneNumber'){
 this.titleSearchTenant='رقم الجوال '
 this.columnSearchTenant=2;
  }else{
     this.titleSearchTenant='المستأجر'
      this.columnSearchTenant=0
      
  }
 console.log(this.columnSearchTenant)

}

OnSearchText(e:any){
  this.searchTextTenant=e.target.value;
}



visibleFilterOwner=false;

selectedFilterOwner:string="FullName"

 columnSearchOwner:any=0
  searchTextOwner: string = ''; // النص اللي المستخدم هيكتبه
  titleSearchOwner:string = 'اسم المالك'


  OnSearchTextOnwer(e:any){
    this.searchTextOwner=e.target.value

  }


  searchFilterOwner(filter:any){
    this.selectedFilterOwner = filter;
    this.visibleFilterOwner=false;
     if(filter==='IdNumber'){
 this.titleSearchOwner='رقم الهويه'
 this.columnSearchOwner=1

  }else if(filter==='PhoneNumber'){
 this.titleSearchOwner='رقم الجوال '
 this.columnSearchOwner=2;
  }else{
     this.titleSearchOwner='المالك'
      this.columnSearchOwner=0
      
  }

  }


  visibleFilterBroker=false;
  
  
selectedFilterBroker:string="FullName"

 columnSearchBroker:any=0
  searchTextBroker: string = ''; // النص اللي المستخدم هيكتبه
  titleSearchBroker:string = 'اسم السمسار'


  OnSearchTextBroker(e:any){
    this.searchTextBroker=e.target.value
  }


    searchFilterBroker(filter:any){
        this.selectedFilterBroker = filter;
       this.visibleFilterBroker=false
     if(filter==='IdNumber'){
 this.titleSearchBroker='رقم الهويه'
 this.columnSearchBroker=1

  }else if(filter==='PhoneNumber'){
 this.titleSearchBroker='رقم الجوال '
 this.columnSearchBroker=2;
  }else{
     this.titleSearchBroker='السمسار'
      this.columnSearchBroker=0
      
  }

  }

  ngOnDestroy(): void {
    if(this.subScription){
      this.subScription.unsubscribe()
    }
  }


}
