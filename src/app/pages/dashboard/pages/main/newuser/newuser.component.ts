import { Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewuserService } from '../../../../../shared/services/newuser.service';
import { ToastrService } from '../../../../../shared/services/toastr.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.scss'
})
export class NewuserComponent {
  fb: FormBuilder = inject(FormBuilder);
  toastr: ToastrService = inject(ToastrService);
  NewUserServices: NewuserService = inject(NewuserService);
  render: Renderer2 = inject(Renderer2);

  @ViewChild('inpChecked') inpChecked!: ElementRef;

  formData = this.fb.group({
    userName: ['', Validators.required],
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    PhoneNumber: ['', Validators.required]
  });

  subScription!: Subscription;
  getAllData: any;
  userStatus = true;
  btnText = 'Add';
  idUpdate: any;
  pageIndex = 1;
  pageSize = 10;
  show = false;
  deleteId: any;

  ngOnInit(): void {
    this.getAllListData();
  }

  getAllListData() {
    const pagination = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
  this.subScription=  this.NewUserServices.getAllListData(pagination).subscribe((res: any) => {
      this.getAllData = res;
    });
  }

  userChange(e: any) {
    this.userStatus = e.target.checked;
  }

  onSubmit() {


    const payload=new FormData();


    payload.append('FullName',this.formData.get('fullName')?.value ?? '');
    payload.append('UserName',this.formData.get('userName')?.value ?? '');
    payload.append('Email',this.formData.get('email')?.value ?? '');
    payload.append('PhoneNumber',this.formData.get('PhoneNumber')?.value ?? '');
    payload.append('isActive',this.userStatus.toString());
    // const payload = {
    //   fullName: this.formData.get('fullName')?.value,
    //   userName: this.formData.get('userName')?.value,
    //   email: this.formData.get('email')?.value,
    //   PhoneNumber: this.formData.get('PhoneNumber')?.value,
    //   isActive: this.userStatus
    // };


    console.log('Payload:', payload);

    if (this.formData.valid) {
      if (this.btnText === 'Add') {
        this.subScription=this.NewUserServices.addData(payload).subscribe({
          next: () => {
            this.toastr.show('تم اضافه البيانات بنجاح', 'success');
            this.getAllListData();
          },
          error: (err) => {
            if (err.error.errors) {
              const errorFields = err.error.errors;
              for (const key in errorFields) {
                errorFields[key].forEach((msg: any) => {
                  this.toastr.show(msg, 'error');
                });
              }
            } else {
              this.toastr.show(err.error.message, 'error');
            }
          }
        });
      } else {
       this.subScription= this.NewUserServices.updateData(this.idUpdate, payload).subscribe(() => {
          this.toastr.show('تم تعديل البيانات بنجاح', 'success');
          this.getAllListData();
          this.btnText = 'Add';
          this.render.setAttribute(this.inpChecked.nativeElement, 'checked', 'true');
        });
      }

      this.formData.reset();
    } else {
      // this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
      this.formData.markAllAsTouched();
    }
  }

  onClose() {
    this.show = false;
  }

  deleteConfirmed(id: any) {
    this.subScription = this.NewUserServices.deleteData(this.deleteId).subscribe(
      {
    next:(res)=>{
      this.getAllListData();
      this.show=false;
 this.toastr.show('تم حذف البيانات','success');      
    },
    error:(err)=>{
      
       this.toastr.show('لا يمكن حذف العنصر إذا كان به حركات','error'); 
    }
   }
    );
  }

  DeleteModel(id: any) {
    this.deleteId = id;
    this.show = true;
  }

  resetData() {
    this.btnText = 'Add';
  }

  getUpdateData(id: any) {
   this.subScription= this.NewUserServices.getUpdateData(id).subscribe((res: any) => {
      this.formData.patchValue({
        fullName: res.fullName,
        userName: res.userName,
        email: res.email,
        PhoneNumber: res.phoneNumber
      });

      this.userStatus = res.isActive;

      if (!res.isActive) {
        this.render.removeAttribute(this.inpChecked.nativeElement, 'checked');
      } else {
        this.render.setAttribute(this.inpChecked.nativeElement, 'checked', 'true');
      }
    });

    this.idUpdate = id;
    this.btnText = 'Update';
  }

  ngOnDestroy(): void {
    if (this.subScription) {
      this.subScription.unsubscribe();
    }
  }

  onPageChanged(page: any) {
    this.pageIndex = page;
    this.getAllListData();
  }
}