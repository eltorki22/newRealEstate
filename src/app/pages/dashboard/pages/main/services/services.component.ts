import { Component, inject } from '@angular/core';
import { ServicesService } from '../../../../../shared/services/services.service';
import { Subscription } from 'rxjs';
import { Services } from '../../../../../shared/Models/services';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

  ServiceService:ServicesService=inject(ServicesService);
  toastr:ToastrService=inject(ToastrService);
  getAllData:any;
  pageIndex=1
  pageSize=10
  btnText="Add";

  subScription!:Subscription
  fb:FormBuilder=inject(FormBuilder);


  formData=this.fb.group({
    name:['',[Validators.required]],
    price:['',[Validators.required]]
  })

  title:Title=inject(Title);

  ngOnInit(){
    this.title.setTitle('الخدمات');
       this.getAllListData()
  }


  resetData(){
    this.btnText='Add';
  }
  onSubmit(){

    
    if(this.formData.valid){


      let payload={
  name: this.formData.get('name')?.value,
  price: this.formData.get('price')?.value
}



      if(this.btnText == "Add"){

       this.subScription= this.ServiceService.addData(payload).subscribe({
        next:(res)=>{
           this.toastr.show('تم اضافه البيانات بنجاح', 'success');
            this.getAllListData()
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
        
      //  (res)=>{
      //      this.toastr.show('تم اضافه البيانات بنجاح', 'success');
      //       this.getAllListData()
      //   })

      }else{


       this.subScription= this.ServiceService.updateData(this.idUpdate,payload).subscribe((res)=>{
            this.getAllListData();
          this.toastr.show('تم تعديل البيانات بنجاح','success');
        
          this.btnText='Add'
        })

      }

      this.formData.reset();


    }else{
      // this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
      this.formData.markAllAsTouched();
    }

  }

  validationNumber(e:any){

    let charCode=e.key.charCodeAt(0)

    if(charCode < 48 || charCode > 57){
      e.preventDefault();
    }

  }

  getAllListData(){
    let pagination2={
  pageIndex: this.pageIndex,
  pageSize: this.pageSize
}
    this.subScription=this.ServiceService.getAllListData(pagination2).subscribe((res:any)=>{

      this.getAllData=res;
     
    })
  }


  idUpdate:any
   getupdateData(id:any){
    this.btnText='Update'

    this.idUpdate=id;
    // this.onSubmit();

   this.subScription= this.ServiceService.getUpdateData(id).subscribe((res:any)=>{

      this.formData.patchValue({
        name:res.name,
        price:res.price
      })

    })
     
  }

   show=false;

   deleteId:any


  DeleteModel(id:any){
    this.deleteId=id;
    this.show=true
  }

   deleteConfirmed(id:any){
  
  
    this.show=false;
    this.subScription=this.ServiceService.deleteData(id).subscribe({
    next:(res)=>{
      this.getAllListData();
 this.toastr.show('تم حذف البيانات','success');      
    },
    error:(err)=>{
      
       this.toastr.show('لا يمكن حذف العنصر إذا كان به حركات','error'); 
    }
   })
  }
  onClose(){
    this.show=false;
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
