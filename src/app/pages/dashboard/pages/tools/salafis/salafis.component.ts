import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { getTodayDate } from '../../../../../shared/validations/datehelpers';
import { EmployeesService } from '../../../../../shared/services/tools/employees.service';
import { Subscription } from 'rxjs';
import { AccountsService } from '../../../../../shared/services/tools/accounts.service';
import { SalafisService } from '../../../../../shared/services/tools/salafis.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-salafis',
  templateUrl: './salafis.component.html',
  styleUrl: './salafis.component.scss'
})
export class SalafisComponent {

  visibleFilter=false
  fb:FormBuilder=inject(FormBuilder);
  toastr:ToastrService=inject(ToastrService)
  employeeSer:EmployeesService=inject(EmployeesService);
  salafisSer:SalafisService=inject(SalafisService);
  accounts:AccountsService=inject(AccountsService)
  subScription!:Subscription
  employeeData:any;
  accountsData:any;
  getAllData:any
  btnText='Add';

  show=false;

  @ViewChild('byan') byan!:ElementRef


  FormSalafis:any

  pageIndex=1;

  pageSize=10;

  idUpadate:any

  title:Title=inject(Title);

  ngOnInit(): void {
    this.title.setTitle('السلفيات')
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.FormSalafis=this.fb.group({
       voucherNumber: ['',Validators.required],
      voucherDate: [getTodayDate(),Validators.required],
      amount: ['',Validators.required],
      employeeId: ['',Validators.required],
      accountId: ['',Validators.required]

    })

    this.getDataEmployee();
    this.getDataAccounts();

    this.getAllDataList();
  }
  

 
  onSubmit(){

    var payload=this.FormSalafis.value;

    

    if(this.FormSalafis.valid){

      if(this.btnText == 'Add'){

        this.subScription=this.salafisSer.addData(payload).subscribe({
          next:(res:any)=>{
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

        this.subScription=this.salafisSer.updateData(this.idUpadate,payload).subscribe((res:any)=>{
                this.getAllDataList();
          this.toastr.show('تم تعديل البيانات بنجاح','success');

          this.btnText='Add';

        })

      }

      this.FormSalafis.reset({
        voucherDate:this.FormSalafis.value.voucherDate
      });

      this.byan.nativeElement.value='';




    }else{
      //  this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
    this.FormSalafis.markAllAsTouched();
    }
  }



  getDataEmployee(){
    let pagination={
      pageIndex:0,
      pageSize:0
    }
   this.subScription= this.employeeSer.getDataAllList(pagination).subscribe((res:any)=>{

    this.employeeData=res.rows.map((item:any)=>{
      return {
        id:item.id,
        fullName:item.fullName,
      }
    })

    

    })
  }


  getDataAccounts(){
     let pagination={
      pageIndex:0,
      pageSize:0
    }
   this.subScription= this.accounts.getAllDataList(pagination).subscribe((res:any)=>{

    this.accountsData=res.rows.map((item:any)=>{
      return {
        id:item.id,
        accountName:item.accountName,
      }
    })

    
    })

    
  }


  validationNumber(e:any){

    var charCode=e.key.charCodeAt(0)

    if(charCode < 48 || charCode > 57){
      e.preventDefault()
    }

  }

  getAllDataList(){
    let pagination={
      pageIndex:this.pageIndex,
      pageSize:this.pageSize
    }
    this.subScription=this.salafisSer.getDataAllList(pagination).subscribe((res:any)=>{
      // console.log(res)
      this.getAllData={
        paginationInfo:res.paginationInfo,
        rows:res.rows.map((item:any)=>{
          return {
            id:item.id,
            employeeName:item.employeeName,
            voucherDate:item.voucherDate,
            voucherNumber:item.voucherNumber,
            amount:item.amount,
            accountName:item.accountName

          }
        })
      }

    })
  }
  

  onPageChanged(page:any){
    this.pageIndex=page;

    this.getAllDataList();

  }


  getUpdateData(id:any){

    
    this.subScription=this.salafisSer.getUpdateData(id).subscribe((res:any)=>{

      this.FormSalafis.patchValue({
           voucherNumber: res.voucherNumber,
      voucherDate: getTodayDate(),
      amount: res.amount,
      employeeId: res.employeeId,
      accountId: res.accountId
      })
    })
    this.idUpadate=id;

    this.btnText='update'
  }


deleteId:any
  onClose(){
    this.show=false
  }


  deleteConfirmed(id:any){

    this.subScription=this.salafisSer.deleteData(id).subscribe((res)=>{
        this.toastr.show('تم حذف البيانات','success');
    this.show=false
    this.getAllDataList();
    })

  }


  deleteModel(id:any){
    this.deleteId=id;
    this.show=true;

  }


  ngOnDestroy(): void {
    if(this.subScription){
      this.subScription.unsubscribe();
    }
  }



}
