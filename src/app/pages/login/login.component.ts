import { Component, ElementRef, inject, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from '../../shared/services/toastr.service';
import { LoginService } from '../../shared/services/login.service';

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
loginSer:LoginService=inject(LoginService)
authSer:AuthService=inject(AuthService);
  otpCodeValue:any
  counter=35;
  @ViewChild('login',{read:TemplateRef}) login!:TemplateRef<any>;
  @ViewChild('otpcodetem',{read:TemplateRef}) otpcodetem!:TemplateRef<any>;
  @ViewChild('container',{read:ViewContainerRef}) vcr!:ViewContainerRef

  @ViewChild('resetpassword',{read:TemplateRef}) resetpass!:TemplateRef<any>;
  @ViewChild('emailForgot',{read:TemplateRef}) emailForgot!:TemplateRef<any>;

  passwordForm: any;
  showNewPassword = false;
  showConfirmPassword = false;

    private destroy$ = new Subject<void>(); // لإدارة التدمير
ngOnInit() {

   if (this.authSer.isLoggedIn()) {
    this.router.navigate(['/dashboard/home']);
  }

  this.passwordForm = this.fb.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });
}



  otpArray = [0, 0, 0, 0,0,0]; // عدد خانات OTP

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  auth:AuthService=inject(AuthService)
  Dataform=this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })


  emailForm=this.fb.group({
    email:['',[Validators.required,Validators.email]]
  })


ngAfterViewInit(): void {

this.vcr.clear();

this.vcr.createEmbeddedView(this.login);


}


  onSubmit(){


    
 if(this.Dataform.valid){
          const data={
        username:this.Dataform.value.username,
        password:this.Dataform.value.password
      }

    this.scription= this.auth.onLogin(data.username!,data.password!).subscribe({
      next:(res:any)=>{
          localStorage.setItem('dataUser',JSON.stringify(res));
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


  showreset:any=false;

  sendOtpCode(){
    if(this.emailForm.valid){
      let email={
        email:this.emailForm.value.email
      }
      this.scription=this.loginSer.sendEmail(email).subscribe({
        next:(res)=>{
          this.toastr.show('تم ارسال رمز التحقق علي البريد الالكتروني','success')
             this.vcr.clear()
             
  interval(1000).pipe(takeUntil(this.destroy$)).subscribe(()=>{
 if (this.counter > 0) {
          this.counter -= 1;
        }else{
          this.showreset=true

        }
  })
    this.vcr.createEmbeddedView(this.otpcodetem)
        },
        error:(err)=>{
          this.toastr.show(err.error.message,'error')
        }
      })
 
    }else{
      this.emailForm.markAllAsTouched();
      
    }
 
  }
 

  replaySend(){
      this.showreset = false;

  const email = {
    email: this.emailForm.value.email
  };

  this.scription = this.loginSer.sendEmail(email).subscribe({
    next: (res) => {
      this.toastr.show('تم إعادة إرسال رمز التحقق بنجاح', 'success');

      // إعادة تشغيل العداد
      interval(1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
        if (this.counter > 0) {
          this.counter -= 1;
        } else {
          this.showreset = true;
        }
      });

    },
    error: (err) => {
      this.toastr.show(err.error.message || 'فشل في إعادة إرسال الرمز', 'error');
    }
  });

  }
submitNewPassword() {
  if (this.passwordForm.valid) {
    const { newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      this.toastr.show('كلمتا المرور غير متطابقتين', 'error');
      return;
    }

    const data = {
      email: this.emailForm.get('email')?.value,
      otpCode: this.otpCodeValue,
      newPassword: confirmPassword
    };

    this.scription = this.loginSer.ChangePassword(data).subscribe({
      next: (res) => {
        this.toastr.show('تم تغيير كلمة المرور بنجاح', 'success');
        this.vcr.clear();
        this.vcr.createEmbeddedView(this.login); // رجوع لشاشة تسجيل الدخول
      },
      error: (err) => {
        this.toastr.show(err.error.message || 'حدث خطأ أثناء تغيير كلمة المرور', 'error');
      }
    });

  } else {
    this.passwordForm.markAllAsTouched();
    this.toastr.show('يرجى تعبئة الحقول بشكل صحيح', 'error');
  }
}




  otpcode(){

    this.vcr.clear()
    this.vcr.createEmbeddedView(this.emailForgot);


  }

  enterData(){
 const otpValues = this.otpInputs.map(input => input.nativeElement.value).join('');

  if (!otpValues || otpValues.length < this.otpArray.length) {
    this.toastr.show('رجاء إدخال رمز التحقق بالكامل', 'error');
    return;
  }


  let data={
    email:this.emailForm.get('email')?.value,
    otpCode:otpValues
  }



  this.otpCodeValue=otpValues;


  this.scription=this.loginSer.verifyEmail(data).subscribe({
    next: (res) => {
      this.toastr.show('تم التحقق من الرمز بنجاح', 'success');
      this.vcr.clear();
      this.vcr.createEmbeddedView(this.resetpass);
    },
    error: (err) => {
      this.toastr.show(err.error.message || 'فشل التحقق من الرمز', 'error');
    }
  })
   
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




  get isLoggedIn(){
    return this.authSer.isLoggedIn()
  }


  ngOnDestroy(): void {
    if(this.scription){
      this.scription.unsubscribe();
    }
    //  clearInterval(this.interval);
      this.destroy$.next();
    this.destroy$.complete(); // 🧹 تنظيف الاشتراك التلقائي
  }
}
