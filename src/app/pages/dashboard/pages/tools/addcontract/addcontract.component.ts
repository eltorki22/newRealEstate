import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadService } from '../../../../../shared/services/file-upload.service';
import { AddContractService } from '../../../../../shared/services/tools/add-contract.service';
import { MsgForm } from '../../../../../shared/Models/msg-form';

@Component({
  selector: 'app-addcontract',
  templateUrl: './addcontract.component.html',
  styleUrl: './addcontract.component.scss'
})
export class AddcontractComponent {

  fb:FormBuilder=inject(FormBuilder);
  fileUploadedServices:FileUploadService=inject(FileUploadService);
  addContractser:AddContractService=inject(AddContractService)
  getAllMessage:MsgForm[]=[];
  subScription:any;


  selectedFile:any
  fileName:any='نسخه';

  formData=this.fb.group({
    ContractNumber:['',Validators.required],
    ContractType:['',Validators.required],
    ContractAddress:['',Validators.required],
    ContractDate:['',Validators.required],
    StartDate:['',Validators.required],
    EndDate:['',Validators.required],
    ReferenceName:[''],
    ContractFile:[null],
    ContractNotes:[''],
    TotalAmount:['',Validators.required],
    PaidAmount:['',Validators.required],
    RemainingAmount:['',Validators.required],
    CommissionValue:['',Validators.required],
    CommissionPaid:['',Validators.required],
    CommissionRemaining:['',Validators.required],
    ReminderDaysBeforeDue:['',Validators.required],
    InsuranceValue:['',Validators.required],

    

    MessageId:['',Validators.required],
    PhoneNumber:['',Validators.required],
    MessageType:['0',Validators.required]
  })

  ngOnInit(){
    this.getAllMessageName();
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
  formData.append('MessageType', this.formData.get('MessageType')?.value ?? '');

  // formData.append('UnitId', this.form.get('UnitId')?.value);
  // formData.append('BrokerId', this.form.get('BrokerId')?.value);
  // formData.append('OwnerId', this.form.get('OwnerId')?.value);
  // formData.append('TenantId', this.form.get('TenantId')?.value);
  // formData.append('MessageId', this.form.get('MessageId')?.value);
  // formData.append('AccountDebitForCompanyId', this.form.get('AccountDebitForCompanyId')?.value);
  // formData.append('AccountCreditForCompanyId', this.form.get('AccountCreditForCompanyId')?.value);



 
 
  
  






      this.subScription

    }else{
      this.formData.markAllAsTouched();
    }

  }


  getAllMessageName(){
   this.subScription= this.addContractser.getAllContactMessage().subscribe((res:any)=>{
      console.log(res.rows);
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




  

}
