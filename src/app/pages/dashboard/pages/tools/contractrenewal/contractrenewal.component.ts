import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getTodayDate } from '../../../../../shared/validations/datehelpers';
import { AddContractService } from '../../../../../shared/services/tools/add-contract.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { UnitService } from '../../../../../shared/services/unit.service';
import { Accounts } from '../../../../../shared/Models/tools/tools';
import { AccountsService } from '../../../../../shared/services/tools/accounts.service';
import { ToastrService } from '../../../../../shared/services/toastr.service';

@Component({
  selector: 'app-contractrenewal',
  templateUrl: './contractrenewal.component.html',
  styleUrl: './contractrenewal.component.scss'
})
export class ContractrenewalComponent {
formData:any
fb:FormBuilder=inject(FormBuilder)
router:Router=inject(Router);
addContractSer:AddContractService=inject(AddContractService)
sub!:Subscription
activeRouter:ActivatedRoute=inject(ActivatedRoute);
accountser:AccountsService=inject(AccountsService)
fileName='نسخه'
unitser:UnitService=inject(UnitService);
toastr:ToastrService=inject(ToastrService);

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
 this.formData= this.fb.group({
      ContractNumber:['',Validators.required],
      ContractType:['',Validators.required],
      ContractAddress:['',Validators.required],
      ContractDate:[getTodayDate(),Validators.required],
      StartDate:[getTodayDate(),Validators.required],
      EndDate:['',Validators.required],
      ReferenceName:[''],
      ContractFile:[null],
      ContractNotes:[''],
      TotalAmount:['',Validators.required],
      PaidAmount:['',Validators.required],
      RemainingAmount:['',Validators.required],
    
      ReminderDaysBeforeDue:['',Validators.required],
      InsuranceValue:['',Validators.required],
      UnitId:[null,Validators.required],
      OwnerId:[null],
      TenantId:[null],
      // BrokerId :[null],
      AccountDebitForCompanyId:[null,Validators.required],
  
      
  
      
  
      MessageId:['',Validators.required],
      PhoneNumber:['',Validators.required],
      MessageType:['0',Validators.required]
    })

    
    this.getUnitData();
   this.getByIdData(); 
   this.getAccountName();
   this.getAllMessageName();
}
goTopreviousContract(){
  this.router.navigate(['dashboard/previouscontract'])
}


dataOwner={
  ownerName:'',
  phone:'',
  nationality:'',
  email:'',
  idType:'',
  idNumber:'',
  fileName:'',
  UnitId:'',
  // id:'',
}
dataTenant={
email: '',
fullName:'',
idFileCopyPath:'',
idNumber:'',
idType:"", 
jobTitle: '',
nationality: '',
phoneNumber:'', 
}




getByIdData() {
  this.sub = this.activeRouter.queryParamMap.subscribe((params: any) => {
    const id = +params.get('id');

    if (!id) {
      this.router.navigate(['dashboard/previouscontract']);
      return;
    }

    this.sub = this.addContractSer.getDataSearch(id).subscribe({
      next: (res: any) => {
        if (res?.id) {
          this.formData.patchValue({
            ContractNumber: res.contractNumber,
            ContractType: res.contractType,
            ContractAddress: res.contractAddress,
            ContractDate: res.contractDate.split('T')[0],
            StartDate: res.startDate.split('T')[0],
            EndDate: res.endDate.split('T')[0],
            ReferenceName: res.referenceName,
            ContractFile: res.contractFilePath,
            ContractNotes: res.contractNotes,
            UnitId: res.unitId,
            TotalAmount: res.totalAmount,
            PaidAmount: res.paidAmount,
            RemainingAmount: res.remainingAmount,
            ReminderDaysBeforeDue: res.reminderDaysBeforeDue,
            InsuranceValue: res.insuranceValue,
            AccountDebitForCompanyId: res.accountDebitForCompanyId,
            MessageId: res.messageId,
            PhoneNumber: res.phoneNumber,
            MessageType: res.messageType,
            OwnerId: res.owner.id,
            TenantId: res.tenant.id
          });

          // بيانات العرض فقط
          this.dataOwner = {
            ownerName: res.owner.fullName,
            email: res.owner.email,
            phone: res.owner.phoneNumber,
            nationality: res.owner.nationality,
            idType: res.owner.idType,
            idNumber: res.owner.idNumber,
            fileName: res.owner.idFileCopyPath?.split('/').pop(),
            UnitId: '',
            
          };

          this.dataTenant = {
            email: res.tenant.email,
            fullName: res.tenant.fullName,
           
            idFileCopyPath: res.tenant.idFileCopyPath?.split('/').pop(),
            idNumber: res.tenant.idNumber,
            idType: res.tenant.idType,
            jobTitle: res.tenant.jobTitle,
            nationality: res.tenant.nationality,
            phoneNumber: res.tenant.phoneNumber
          };

          this.fileName = res.contractFilePath?.split('/').pop();
        } else {
          this.router.navigate(['dashboard/previouscontract']);
        }
      },
      error: (err) => {
        console.error('حدث خطأ أثناء جلب البيانات:', err);
        this.router.navigate(['dashboard/previouscontract']);
      }
    });
  });
}



getNameUnit:any=[]

getUnitData(){
  let pagination={
    pageIndex:0,
    pageSize:0,
  }
this.sub=this.unitser.getAllListData(pagination).subscribe((res:any)=>{
this.getNameUnit=res.rows;
console.log(this.getNameUnit);
})
}


accountCompany:any;
getAccountName(){
    let pagination={
      pageIndex:0,
      pageSize:0
    }
    this.sub=this.accountser.getAllDataList(pagination).subscribe((res:any)=>{
      // console.log(res);
      this.accountCompany=res.rows.map((item:any)=>{
        return {
          id:item.id,
          accountName:item.accountName
        }
      });
      
    })
  }

  getAllMessage:any
    getAllMessageName(){
   this.sub= this.addContractSer.getAllContactMessage().subscribe((res:any)=>{
      this.getAllMessage=res.rows;
    })
  }
onSubmit(){
  let payload=new FormData();


  payload.append('ContractNumber',this.formData.get('ContractNumber')?.value || '');
  payload.append('ContractType',this.formData.get('ContractType')?.value || '');
  payload.append('ContractDate',this.formData.get('ContractDate')?.value || '');
  payload.append('ContractAddress',this.formData.get('ContractAddress')?.value || '');
  payload.append('StartDate',this.formData.get('StartDate')?.value || '');
  payload.append('EndDate',this.formData.get('EndDate')?.value || '');
  payload.append('ReferenceName',this.formData.get('ReferenceName')?.value || '');
  payload.append('UnitId',this.formData.get('UnitId')?.value || '');
  payload.append('OwnerId',this.formData.get('OwnerId')?.value || '');
  payload.append('TenantId',this.formData.get('TenantId')?.value || '');
  payload.append('MessageId',this.formData.get('MessageId')?.value || '');
  payload.append('ContractFile',this.formData.get('ContractFile')?.value || '');
  payload.append('ContractNotes',this.formData.get('ContractNotes')?.value || '');
  payload.append('TotalAmount',this.formData.get('TotalAmount')?.value || '');
  payload.append('PaidAmount',this.formData.get('PaidAmount')?.value || '');
  payload.append('RemainingAmount',this.formData.get('RemainingAmount')?.value || '');
  payload.append('ReminderDaysBeforeDue',this.formData.get('ReminderDaysBeforeDue')?.value || '');
  payload.append('PhoneNumber',this.formData.get('PhoneNumber')?.value || '');
  payload.append('InsuranceValue',this.formData.get('InsuranceValue')?.value || '');
  payload.append('AccountDebitForCompanyId',this.formData.get('AccountDebitForCompanyId')?.value || '');
  payload.append('MessageId',this.formData.get('MessageId')?.value || '');
  payload.append('MessageType',this.formData.get('MessageType')?.value || '');
  if(this.formData.valid){
    this.sub=this.addContractSer.contractRenewal(payload).subscribe({
      next:(res:any)=>{
        this.toastr.show('تم تجديد العقد بنجاح','success');
        this.router.navigate(['dashboard/previouscontract']);
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
  }else{
     this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
      this.formData.markAllAsTouched();
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
