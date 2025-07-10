import { Component, inject } from '@angular/core';
import { ArrestdocumentService } from '../../../../../shared/services/tools/arrestdocument.service';
import { Accounts, arrestDocument } from '../../../../../shared/Models/tools/tools';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { getTenant } from '../../../../../shared/Models/Tenat';
import { AccountsService } from '../../../../../shared/services/tools/accounts.service';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { getTodayDate } from '../../../../../shared/validations/datehelpers';

@Component({
  selector: 'app-arestdocument',
  templateUrl: './arestdocument.component.html',
  styleUrl: './arestdocument.component.scss'
})
export class ArestdocumentComponent {

 receiptForm!: any;
 fb:FormBuilder=inject(FormBuilder);
 toastr:ToastrService=inject(ToastrService)
  btnText='Add';
  idUpdate:any
 
  arrestDocument:ArrestdocumentService=inject(ArrestdocumentService);
  accountSer:AccountsService=inject(AccountsService)
  getData:any;
  subScription!:Subscription;
  getNameTenantData:getTenant[]=[];

  getNameAccounts:Accounts[]=[];

  date=getTodayDate();

  pageIndex=1;
  pageSize=10;

  ngOnInit(): void {
      this.receiptForm = this.fb.group({
      voucherNumber: ['', Validators.required],
      amount: ['', [Validators.required]],
      voucherDate: [getTodayDate(), Validators.required],
      tenantId: ['', Validators.required],
      accountsId: ['', Validators.required],
      description: ['',[Validators.required]]
    });

    console.log(getTodayDate())
    this.getAllListData();
    this.getNameTenant();
    this.getAccountName();
  }

    onSubmit(): void {


      let payload={
        voucherNumber:this.receiptForm.get('voucherNumber').value,
        amount:this.receiptForm.get('amount').value,
        voucherDate:this.receiptForm.get('voucherDate').value,
        tenantId:this.receiptForm.get('tenantId').value,
        accountsId:this.receiptForm.get('accountsId').value,
        description:this.receiptForm.get('description').value,



      }
    if (this.receiptForm.valid) {

      if(this.btnText=='Add'){
 this.subScription=this.arrestDocument.addData(payload).subscribe({
        next:(res)=>{
            this.getAllListData();
            this.toastr.show('تم اضافه البيانات بنجاح', 'success');
        },error:(err)=>{
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

        this.subScription=this.arrestDocument.updateData(this.idUpdate,payload).subscribe((res:any)=>{
                this.getAllListData();
          this.toastr.show('تم تعديل البيانات بنجاح','success');
   
          this.btnText='Add'
        })
      
      }


      this.receiptForm.reset();
     
      

    } else {
      this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
      this.receiptForm.markAllAsTouched();
    }
  }


  getUpdateData(id:any){

    this.idUpdate=id;
    this.btnText='update';

  this.subScription=this.arrestDocument.getUpdateData(id).subscribe((res:any)=>{
    this.receiptForm.patchValue({

      voucherNumber: res.voucherNumber,
      amount:res.amount,
      voucherDate: getTodayDate(),
      tenantId: res.tenantId,
      accountsId: res.accountsId,
      description: res.description
      
    })
  })

  }

  validationNumber(e:any){

    const charCode=e.key.charCodeAt(0);

    if(charCode < 48 || charCode  > 57){
      e.preventDefault();
    }



  }

  
  getAllListData(){
    let pagination={
      pageIndex:this.pageIndex,
      pageSize:this.pageSize
    }
    this.subScription=this.arrestDocument.getAllListData(pagination).subscribe((res:any)=>{

      this.getData=res;
    })
  }


  getNameTenant(){
    this.subScription=this.arrestDocument.getNameTenant().subscribe((res:any)=>{
      this.getNameTenantData=res.rows;
    })
  
    
  }

  getAccountName(){
    let pagination={
      pageIndex:0,
      pageSize:0
    }
    this.subScription=this.accountSer.getAllDataList(pagination).subscribe((res:any)=>{
     this.getNameAccounts=res.rows
    })
  }


  show=false;
  deleteId:any

  onClose(){
    this.show=false;
  }


  deleteConfirmed(id:any){
    this.toastr.show('تم حذف البيانات','success');
    this.show=false
    this.subScription=this.arrestDocument.deleteData(id).subscribe((res)=>{
      this.getAllListData();
    })
  }


  deleteModel(id:any){
    this.show=true;
    this.deleteId=id;

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subScription){
      this.subScription.unsubscribe();
    }
  }

  onPageChanged(page:any){
    this.pageIndex=page;
    this.getAllListData();

  }
}
