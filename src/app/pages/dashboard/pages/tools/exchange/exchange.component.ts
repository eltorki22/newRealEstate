import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../../../../../shared/services/services.service';
import { Subscription } from 'rxjs';
import { Services } from '../../../../../shared/Models/services';
import { AccountsService } from '../../../../../shared/services/tools/accounts.service';
import { Accounts, exchange } from '../../../../../shared/Models/tools/tools';
import { ExchangeService } from '../../../../../shared/services/tools/exchange.service';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { getTodayDate } from '../../../../../shared/validations/datehelpers';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.scss'
})
export class ExchangeComponent {

  voucherForm:any;

  fb:FormBuilder=inject(FormBuilder);
  getNameServices:ServicesService=inject(ServicesService)
  AccountServices:AccountsService=inject(AccountsService)
  exchangeSer:ExchangeService=inject(ExchangeService);
  toastr:ToastrService=inject(ToastrService);
  accountData:Accounts[]=[]
  getNameService:Services[]=[];
  getDataAll:any;
  subScription!:Subscription
  btnText='Add';
  idUpdate:any;

  pageIndex=1;
  pageSize=10;

  title:Title=inject(Title);
  ngOnInit(): void {
    this.voucherForm = this.fb.group({
      voucherNumber: ['', Validators.required],
      amount: ['', [Validators.required]],
      voucherDate: [getTodayDate(), Validators.required],
      accountsId: ['', Validators.required],
      serviceId: ['', Validators.required],
      description: ['']
    });

    this.getServicesName();
    this.getAccountName();
    this.getAllDataList();
    this.title.setTitle('سند الصرف')
  }

  onSubmit(): void {
    if (this.voucherForm.valid) {
      const payload = this.voucherForm.value;
      if(this.btnText=='Add'){
        this.subScription=this.exchangeSer.addData(payload).subscribe({
          next:(res)=>{

            this.getAllDataList();
            this.toastr.show('تم اضافه البيانات بنجاح', 'success');
 
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

        this.subScription=this.exchangeSer.updateData(this.idUpdate,payload).subscribe((res)=>{
   this.getAllDataList();
          this.toastr.show('تم تعديل البيانات بنجاح','success');
      
          this.btnText='Add'
        })

      }

      this.voucherForm.reset();
    } else {
      // this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح','error')
      this.voucherForm.markAllAsTouched();
    }
  }



  validationNumber(e:any){

    const charCode=e.key.charCodeAt(0);

    if(charCode < 48 || charCode  > 57){
      e.preventDefault();
    }



  }

  getServicesName(){
    let pagination={
      pageIndex:0,
      pageSize:0,
    }
    this.getNameServices.getAllListData(pagination).subscribe((res:any)=>{
      this.getNameService=res.rows;
    })
  }


  getAccountName(){
    let pagination={
      pageIndex:0,
      pageSize:0
    }
    // this.getAccountName.
    this.subScription=this.AccountServices.getAllDataList(pagination).subscribe((res:any)=>{
      this.accountData=res.rows;
    })
  }


  getAllDataList(){
    let pagination={
      pageIndex:this.pageIndex,
      pageSize:this.pageSize,
    }
   this.subScription= this.exchangeSer.getAllDataList(pagination).subscribe((res:any)=>{
    // console.log(res.rows);
    this.getDataAll=res;
    })
  }

  getUpdateData(id:any){
    this.subScription=this.exchangeSer.getUpdateData(id).subscribe((res:any)=>{
        this.voucherForm.patchValue({
            voucherNumber: res.voucherNumber,
      amount: res.amount,
      voucherDate: getTodayDate(),
      accountsId: res.accountsId,
      serviceId:res.serviceId,
      description: res.description
        })
    })

    this.btnText='Update';
    this.idUpdate=id;

  }


   show=false;
  deleteId:any

  onClose(){
    this.show=false;
  }


  deleteConfirmed(id:any){
    this.toastr.show('تم حذف البيانات','success');
    this.show=false
    this.subScription=this.exchangeSer.deleteData(id).subscribe((res)=>{
      this.getAllDataList();
      
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
    this.getAllDataList();
  }

}
