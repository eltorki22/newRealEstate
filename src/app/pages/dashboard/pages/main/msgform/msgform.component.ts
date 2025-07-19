import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MsgFormService } from '../../../../../shared/services/msg-form.service';
import { MsgForm } from '../../../../../shared/Models/msg-form';
import { Subscription } from 'rxjs';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-msgform',
  templateUrl: './msgform.component.html',
  styleUrl: './msgform.component.scss'
})
export class MsgformComponent {

  fb:FormBuilder=inject(FormBuilder)
  pageIndex=1;
  pageSize=10;

  msgServices:MsgFormService=inject(MsgFormService);
  subScription!:Subscription

  toastr:ToastrService=inject(ToastrService)
  btnText='Add';
  idUpdate:any;
  getAllData:any=[];

  formData=this.fb.group({
    messageName:['',Validators.required],
    message:['',Validators.required]
  })

  title:Title=inject(Title);

  ngOnInit(){
    this.title.setTitle('نموذج الرسائل ')
    this.getAllListData();
  }

  onSubmit(){
    let payload={
      
  messageName: this.formData.get('messageName')?.value,
  message: this.formData.get('message')?.value,
    }
    if(this.formData.valid){
      if(this.btnText == 'Add'){
    this.subScription=  this.msgServices.addData(payload).subscribe({
      next:(err)=>{

       
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

          let payload2={
      id:this.idUpdate ,
  messageName: this.formData.get('messageName')?.value,
  message: this.formData.get('message')?.value,
    }
       this.subScription= this.msgServices.updateData(payload2).subscribe((res)=>{
          
          this.toastr.show('تم تعديل البيانات بنجاح','success');
          this.getAllListData();
        
        })

          this.btnText='Add'



      }

    this.formData.reset();  


    }else{
        // this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
      this.formData.markAllAsTouched()

    }
  
  }


  resetDataForm(){
    this.btnText='Add'
  }
  getUpdateData(id:any){
    console.log(id);

   this.subScription= this.msgServices.getUpdateData(id).subscribe((res:any)=>{
      this.formData.patchValue({
        messageName:res.messageName,
        message:res.message,
      })
    })

    this.btnText='Update'
    this.idUpdate=id;
  }

  getAllListData(){
    // return \\t

    let pagination={
      pageIndex:this.pageIndex,
      pageSize:this.pageSize
    }
   this.subScription= this.msgServices.getDataAllList(pagination).subscribe((res:any)=>{
      this.getAllData=res;
    })

  }



  show=false;


  deleteId:any
  onClose(){
    this.show=false;
  }


  deleteModel(id:any){
    this.deleteId=id;
    this.show=true
    
  }



  deleteConfirmed(id:any){
     this.show=false;
    this.subScription=this.msgServices.deleteData(id).subscribe({
    next:(res)=>{
      this.getAllListData();
 this.toastr.show('تم حذف البيانات','success');      
    },
    error:(err)=>{
      
       this.toastr.show('لا يمكن حذف العنصر إذا كان به حركات','error'); 
    }
   })
  }



  onPageChanged(page:any){
    this.pageIndex=page;

    this.getAllListData();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subScription){
      this.subScription.unsubscribe();
    }
  }
}
