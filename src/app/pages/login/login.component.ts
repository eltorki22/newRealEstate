import { Component, ElementRef, inject, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from '../../shared/services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  fb:FormBuilder=inject(FormBuilder);
  router:Router=inject(Router)
  scription!:Subscription;
  toastr:ToastrService=inject(ToastrService)
  
  @ViewChild('login',{read:TemplateRef}) login!:TemplateRef<any>;
  @ViewChild('otpcodetem',{read:TemplateRef}) otpcodetem!:TemplateRef<any>;
  @ViewChild('container',{read:ViewContainerRef}) vcr!:ViewContainerRef

  @ViewChild('resetpassword',{read:TemplateRef}) resetpass!:TemplateRef<any>;

  passwordForm: any;
  showNewPassword = false;
  showConfirmPassword = false;

ngOnInit() {
  this.passwordForm = this.fb.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });
}


  otpArray = [0, 0, 0, 0]; // عدد خانات OTP

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  auth:AuthService=inject(AuthService)
  Dataform=this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })


ngAfterViewInit(): void {

this.vcr.clear();

this.vcr.createEmbeddedView(this.login);


}


  onSubmit(){


    
 if(this.Dataform.valid){
      // if(this.checked){
          const data={
        username:this.Dataform.value.username,
        password:this.Dataform.value.password
      }

    this.scription= this.auth.onLogin(data.username!,data.password!).subscribe({
      next:(res:any)=>{
          console.log(res)
          this.toastr.show('تم تسجيل الدخول بنجاح','success')

          if(res.token){
            this.router.navigate(['/dashboard/home'])
             localStorage.setItem('token',res.token)

          }



      },
      error:(error)=>{
         this.toastr.show("يرجى التأكد من اسم المستخدم وكلمة المرور والمحاولة مرة أخرى",'error')
      }
    })

      this.Dataform.markAsUntouched()

      // }
    
    }else{
      this.Dataform.markAllAsTouched();
    }
    
   

  }


  submitNewPassword() {
  if (this.passwordForm.valid) {
    const { newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      alert('كلمتا المرور غير متطابقتين');
      return;
    }

    // إرسال كلمة المرور للسيرفر هنا
    console.log('New Password:', newPassword);
  }
}



  otpcode(){

    this.vcr.clear()
    this.vcr.createEmbeddedView(this.otpcodetem)

  }

  enterData(){
    this.vcr.clear();

    this.vcr.createEmbeddedView(this.resetpass)
  }



  onOtpInput(e:any,index:number){
      const input = e.target;
      let value = input.value;
      value = value.replace(/[^0-9]/g, '');
      input.value=value;

       if (value && index < this.otpArray.length - 1) {
      const nextInput = this.otpInputs.toArray()[index + 1].nativeElement;
      nextInput.focus();
    }



  }

  ngOnDestroy(): void {
    if(this.scription){
      this.scription.unsubscribe();
    }
  }
}
