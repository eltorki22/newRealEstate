import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Accounts } from '../../../../../shared/Models/tools/tools';
import { Subscription } from 'rxjs';
import { AccountsService } from '../../../../../shared/services/tools/accounts.service';
import { ToastrService } from '../../../../../shared/services/toastr.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent {

    accountForm!: any;

    

  fb:FormBuilder=inject(FormBuilder)
  accountSer:AccountsService=inject(AccountsService);
  toastr:ToastrService=inject(ToastrService)
  subSciption!:Subscription
  btnText='Add';
  idUpdate:any=null
  pageIndex=1;
  pageSize=10;

  accountData:any;

   ngOnInit(){
     this.accountForm = this.fb.group({
      accountName: ['', Validators.required],
      accountType: ['', Validators.required],
      accountNumber: ['', [Validators.required]],
      ibanNumber: ['', [Validators.required]]
    });

    this.getAllDataList();
   }



   onSubmit(){
    if(this.accountForm.valid){

     let payload={
      accountName:this.accountForm.get('accountName').value,
      accountType:this.accountForm.get('accountType').value,
      accountNumber:this.accountForm.get('accountNumber').value,
      ibanNumber:this.accountForm.get('ibanNumber').value,
     }

      if(this.btnText == 'Add'){

      this.subSciption=this.accountSer.addData(payload).subscribe({
        next:(res:any)=>{
                  this.toastr.show('تم اضافه البيانات بنجاح', 'success');
            this.getAllDataList()
        },
        error:(err)=>{
          this.toastr.show("فشل ارسال البيانات", 'error');
          // console.log(err)
        }
      })


      }else{

         let payloadEdit={
          id:this.idUpdate,
      accountName:this.accountForm.get('accountName').value,
      accountType:this.accountForm.get('accountType').value,
      accountNumber:this.accountForm.get('accountNumber').value,
      ibanNumber:this.accountForm.get('ibanNumber').value,
     }

          this.subSciption=this.accountSer.updateData(payloadEdit).subscribe((res)=>{

          this.getAllDataList();
          this.toastr.show('تم تعديل البيانات بنجاح','success');
          this.accountForm.reset()
          this.btnText='Add'
        })
      

      }

      this.accountForm.reset();

    }else{
      this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
      this.accountForm.markAllAsTouched();
    }

   }



    validationNumber(e:any){

    const charCode=e.key.charCodeAt(0);

    if(charCode < 48 || charCode  > 57){
      e.preventDefault();
    }
  }


  getAllDataList(){
    let pagination={
      pageIndex:this.pageIndex,
      pageSize:this.pageSize
    }
      this.subSciption=this.accountSer.getAllDataList(pagination).subscribe((res:any)=>{
        this.accountData=res;
        console.log(this.accountData)      })
  }



  getupdateData(id:any){
  this.btnText='update';

    this.subSciption=this.accountSer.getUpdateData(id).subscribe((res:any)=>{
      this.accountForm.patchValue({
        accountName:res.accountName,
        accountType:res.accountType,
        accountNumber:res.accountNumber,
        ibanNumber:res.accountNumber

      })
          this.idUpdate=id;
    })



    
  }


  resetData(){
    this.btnText='Add';
  }


  deleteId:any
  show=false

  onClose(){
    this.show=false;
  }


  deleteConfirmed(id:any){


        this.toastr.show('تم حذف البيانات','success');
    this.show=false;
  
    this.subSciption=this.accountSer.deleteData(id).subscribe((res)=>{
      this.getAllDataList();
    })

  }


  deleteModel(id:any){
    this.deleteId=id;


    this.show=true;

  }

  onPageChanged(page:any){
    this.pageIndex=page;

    this.getAllDataList()

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subSciption){
      this.subSciption.unsubscribe();
    }
  }

}
