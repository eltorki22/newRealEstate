import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChangepasswordService } from '../../../../../shared/services/settings/changepassword.service';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit, OnDestroy {
  changePassForm!: FormGroup;
  sub!: Subscription;

  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  fb: FormBuilder = inject(FormBuilder);
  changePasswordSer: ChangepasswordService = inject(ChangepasswordService);
  toastr: ToastrService = inject(ToastrService);

  dataUser: any;
  title:Title=inject(Title)
  ngOnInit(): void {
    this.title.setTitle('تغيير كلمه المرور')
    // جلب بيانات المستخدم من localStorage
    const userJson = localStorage.getItem('dataUser');
    if (userJson) {
      this.dataUser = JSON.parse(userJson);
    }

    this.changePassForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPass = form.get('newPassword')?.value;
    const confirmPass = form.get('confirmPassword')?.value;
    return newPass === confirmPass ? null : { mismatch: true };
  }

  changePassword() {
    if (this.changePassForm.invalid) {
      this.changePassForm.markAllAsTouched();
      // this.toastr.show('يرجى التأكد من إدخال كل البيانات بشكل صحيح', 'error');
      return;
    }

    const { oldPassword, newPassword } = this.changePassForm.value;

    const requestData = {
      userName: this.dataUser?.userName,
      oldPassword,
      newPassword
    };

    this.sub = this.changePasswordSer.changePassword(requestData).subscribe({
      next: () => {
        this.toastr.show('تم تغيير كلمة المرور بنجاح', 'success');
        this.changePassForm.reset();
      },
      error: () => {
        this.toastr.show('حدث خطأ أثناء تغيير كلمة المرور', 'error');
      }
    });
  }

  ngOnDestroy(): void {
    if(this.sub){
this.sub?.unsubscribe();
    }
    
  }
}
