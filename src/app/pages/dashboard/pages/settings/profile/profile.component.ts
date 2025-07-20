import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProfileService } from '../../../../../shared/services/settings/profile.service';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { SendUserService } from '../../../../../shared/services/settings/send-user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  formData!: FormGroup;
  dataUser: any;
  selectedFile: File | null = null;
  subScription!: Subscription;

  fb: FormBuilder = inject(FormBuilder);
  profileSer: ProfileService = inject(ProfileService);
  toastr: ToastrService = inject(ToastrService);
  sendUserser:SendUserService=inject(SendUserService)
title:Title=inject(Title);
  ngOnInit(): void {

    this.title.setTitle('الملف الشخصي')
  const userJson = localStorage.getItem('dataUser');
  
  if (!userJson) {
    this.toastr.show('حدث خطأ: لا توجد بيانات مستخدم مخزنة', 'error');
    return;
  }

  this.dataUser = JSON.parse(userJson);

  this.formData = this.fb.group({
    UserName: [this.dataUser.userName || '', [Validators.required]],
    FullName: [this.dataUser.fullName || '', [Validators.required]],
    Email: [this.dataUser.email || '', [Validators.required, Validators.email]],
    phoneNumber: [this.dataUser.phoneNumber || '', [Validators.required]],
    profilePictureUrl: [null]
  });
}
 

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
     

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.dataUser.profilePictureUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.formData.invalid) {
      // this.toastr.show("يرجى تعبئة البيانات كاملة", 'error');
      this.formData.markAllAsTouched();
      return;
    }

    const form = new FormData();
    form.append('UserName', this.formData.value.UserName);
    form.append('FullName', this.formData.value.FullName);
    form.append('Email', this.formData.value.Email);
    form.append('PhoneNumber', this.formData.value.phoneNumber);
    form.append('IsActive','true');

    if (this.selectedFile) {
      form.append('ProfilePicture', this.selectedFile);
      // localStorage.setItem('dataUser', JSON.stringify(this.dataUser));
    }

    this.subScription = this.profileSer.updateData(this.dataUser.id, form).subscribe({
      next: (res: any) => {
        this.toastr.show('تم تعديل البيانات بنجاح', 'success');

         if (res?.profilePictureUrl) {
      this.dataUser.profilePictureUrl = res.profilePictureUrl;
      this.dataUser.userName = this.formData.value.UserName;
    this.dataUser.fullName = this.formData.value.FullName;
    this.dataUser.email = this.formData.value.Email;
    this.dataUser.phoneNumber = this.formData.value.phoneNumber;

    //  localStorage.setItem('dataUser', JSON.stringify(this.dataUser));.
     this.sendUserser.setUser(this.dataUser);
    }

 
      },
      error: (err: any) => {
        this.toastr.show('حدث خطأ أثناء حفظ البيانات', 'error');
        console.error(err);
      }
    });
  }



  getProfileImageUrl(): string {
  if (!this.dataUser?.profilePictureUrl) return '';
  
  if (this.dataUser.profilePictureUrl.startsWith('data:image')) {
    // صورة Base64 مؤقتة
    return this.dataUser.profilePictureUrl;
  }

  // صورة من السيرفر
  return 'http://gtsdev-001-site17.atempurl.com' + this.dataUser.profilePictureUrl;
}


  ngOnDestroy(): void {
    if (this.subScription) {
      this.subScription.unsubscribe();
    }
  }
}
