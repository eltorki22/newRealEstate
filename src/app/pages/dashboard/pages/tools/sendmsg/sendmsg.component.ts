import { Component, ElementRef, HostListener, inject, Renderer2, ViewChild } from '@angular/core';
import { AddTenantService } from '../../../../../shared/services/add-tenant.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { SendMsgService } from '../../../../../shared/services/tools/send-msg.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sendmsg',
  templateUrl: './sendmsg.component.html',
  styleUrl: './sendmsg.component.scss'
})
export class SendmsgComponent {

  render:Renderer2=inject(Renderer2);

  @ViewChild('selectBtn') selectBtn!: ElementRef;


  formData:any;
  fb:FormBuilder=inject(FormBuilder);
  sendMsgser:SendMsgService=inject(SendMsgService)

  subScription!:Subscription;
  getData:any=[];
  toastr:ToastrService=inject(ToastrService);
  TenantSer:AddTenantService=inject(AddTenantService);
  @ViewChild('messageModal') messageModal!:ElementRef;
  @ViewChild('modal-backdrop') modal_backdrop!:ElementRef

  show=true;

  dataSelected:any;

  title:Title=inject(Title);

  ngOnInit(): void {
    this.title.setTitle('ارسال رساله')
    this.formData=this.fb.group({
      messageText:['',Validators.required],
      recipientNumbers:['',Validators.required],
      isSms:[true],
    })
    this.getDataTenantSer();  
  }


@HostListener('document:keydown',['$event'])

onselect(e:any){

  if(e.key == 'Enter'){
    this.selectBtn.nativeElement.click();
  }

}

  @ViewChild('closeBtn') closeBtn!: ElementRef;

  btnSelected(){
     const selectedInput: any = document.querySelector('input[name="msg"]:checked');

  if (!selectedInput) {
    this.toastr.show('يرجى اختيار رسالة أولاً', 'error');
    return;
  }

  // أولًا خد النص
  const selectedLabel = document.querySelector(`label[for="${selectedInput.id}"]`);
  const messageText = selectedLabel?.textContent?.trim() || '';

  // ضيفه للفورم
  this.formData.patchValue({
    messageText: messageText
  });




  // أزل التحديد عشان تقدر تختار نفس الرسالة مرة تانية
  selectedInput.checked = false;

  // اختياريًا، أقفل المودال يدويًا
  // const modalBackdrop = document.querySelector('.modal-backdrop');
  // if (modalBackdrop) {
    // this.render.setStyle(modalBackdrop, 'display', 'none');
  // }

 this.closeBtn.nativeElement.click(); 
  this.show = false;
  }



  getDataTenantSer(){

    let pagination={
      pageIndex:0,
      pageSize:0
    }
    this.subScription=this.TenantSer.getAllData(pagination).subscribe((res:any)=>{
      this.getData=res.rows.map((item:any)=>{
        return {
          id:item.id,
          fullName:item.fullName,
          phoneNumber:item.phoneNumber,
        }
      })
    })

  }


  onSubmit(){

    let payload={  
  messageText: this.formData.get('messageText').value,
  recipientNumbers: [
    this.formData.get('recipientNumbers').value,
  ],
  isSms: this.formData.get('isSms').value 
}
    if (this.formData.valid) {
    
    this.subScription = this.sendMsgser.addData(payload).subscribe({
      next:(res)=>{
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

          console.log(err);
         
            this.toastr.show('حدث خطأ أثناء العملية', 'error');

         }

        
      }


    })

    this.formData.reset({
     isSms: this.formData.get('isSms')?.value
    }
  
    );

  } else {
    this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
    this.formData.markAllAsTouched();
  }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subScription){
      this.subScription.unsubscribe();
    }
  }
}
