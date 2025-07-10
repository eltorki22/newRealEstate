import { Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewuserService } from '../../../../../shared/services/newuser.service';
import { Newuser } from '../../../../../shared/Models/newuser';
import { ToastrService } from '../../../../../shared/services/toastr.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.scss'
})
export class NewuserComponent {

  fb:FormBuilder=inject(FormBuilder);
  subScription!:Subscription
  getAllData:any;
  userStatus=true;
  toastr:ToastrService=inject(ToastrService);
  btnText='Add';
idUpdate:any
pageIndex=1;
pageSize=10


  @ViewChild('inpChecked') inpChecked!:ElementRef;
  render:Renderer2=inject(Renderer2);

  NewUserServices:NewuserService=inject(NewuserService)
  formData=this.fb.group({
    userName:['',Validators.required],
    fullName:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    phoneNumber:['',Validators.required],
  })
  
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAllListData();
}




  getAllListData(){
    let pagination={
  pageIndex: this.pageIndex,
  pageSize: this.pageSize
}
    this.NewUserServices.getAllListData(pagination).subscribe((res:any)=>{
      // console.log(res);
      this.getAllData=res.rows;
      console.log(this.getAllData)
    })
  }

  userChange(e:any){
    if(e.target.checked){
      // console.log(true);
      this.userStatus=true;


    }else{
      // console.log(false)
      this.userStatus=false
    }

  }


  onSubmit(){

    let payload={
        fullName:this.formData.get('fullName')?.value ,
        userName: this.formData.get('userName')?.value,
        email:this.formData.get('email')?.value,
        phoneNumber:this.formData.get('phoneNumber')?.value,
        isActive:this.userStatus
    }
    if(this.formData.valid){
    if(this.btnText=='Add'){
        this.NewUserServices.addData(payload).subscribe({
          next:(res)=>{
              this.toastr.show('تم اضافه البيانات بنجاح', 'success');
              this.getAllListData()
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
          this.toastr.show(err.error.message,'error');
            console.log(err.error.message)
            

         }
           
          }
        })
    }else{
      this.NewUserServices.updateData(this.idUpdate,payload).subscribe((res:any)=>{
        // console.log(res);
           this.toastr.show('تم تعديل البيانات بنجاح','success');
          this.getAllListData();
          this.btnText='Add';
          this.render.setAttribute(this.inpChecked.nativeElement,'checked','true');

      })

    }

    this.formData.reset();

    }else{
        this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
      this.formData.markAllAsTouched()
    }
  }


  show=false


  onClose(){
    this.show=false
  }

  deleteId:any;


  deleteConfirmed(id:any){


    this.subScription=this.NewUserServices.deleteData(this.deleteId).subscribe((res)=>{
          this.getAllListData();
          this.show=false;
      this.toastr.show('تم حذف البيانات','success');
    })

  }

  DeleteModel(id:any){
    this.deleteId=id;
    this.show=true;

  }

  resetData(){
    this.btnText='Add';
  }


  getUpdateData(id:any){

    console.log(id);
    this.NewUserServices.getUpdateData(id).subscribe((res:any)=>{

      console.log(res);

      this.formData.patchValue({
        fullName:res.fullName,
        userName:res.userName,
        email:res.email,
        phoneNumber:res.phoneNumber,
      })


      if(this.userStatus){
     this.userStatus=res.isActive     
      }


      if(res.isActive==false){

        this.render.removeAttribute(this.inpChecked.nativeElement,'checked')

      }else{
        this.render.setAttribute(this.inpChecked.nativeElement,'checked','true')
      }
   
    })


    this.idUpdate=id

    this.btnText='Update'
  }

  ngOnDestroy(): void {
    if(this.subScription){
      this.subScription.unsubscribe()
    }
  }

  onPageChanged(page:any){
    this.pageIndex=page;
    this.getAllListData()
  }

}
