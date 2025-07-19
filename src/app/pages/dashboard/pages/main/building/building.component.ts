import { Component, inject } from '@angular/core';
import { BuildingService } from '../../../../../shared/services/building.service';
import { Subscription } from 'rxjs';
import { Building } from '../../../../../shared/Models/building';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { Owners } from '../../../../../shared/Models/owners';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrl: './building.component.scss'
})
export class BuildingComponent {

  BuildingService:BuildingService=inject(BuildingService);

  subScription!:Subscription;

  getAllData:any;
  getAllOwnerData:Owners[]=[];
  btnText='Add'
  idUpdate:any

  pageIndex=1;
  pageSize=10;

  show=false

  fb:FormBuilder=inject(FormBuilder);

  toastr:ToastrService=inject(ToastrService);


  formData=this.fb.group({

    name:['',[Validators.required]],
    address:['',[Validators.required]],
    ownerId:[null,[Validators.required]]
  })




  ngOnInit(){
    this.getDataList();
    this.getDataListOwner();
  }
  getDataList(){
    this.subScription=this.BuildingService.getDataList().subscribe((res:any)=>{
      this.getAllData=res;
    })
  }


  getDataListOwner(){
    let pagination={

  pageIndex: this.pageIndex,
  pageSize: this.pageSize

    }
   this.subScription= this.BuildingService.getDataListOwner(pagination).subscribe((res:any)=>{
      this.getAllOwnerData=res.rows;
    })
  }

  onSubmit(){
    if(this.formData.valid){
  let payload={
          name:this.formData.get('name')?.value || '',
          address:this.formData.get('address')?.value || '',
          ownerId:this.formData.get('ownerId')?.value || ''
        }
      if(this.btnText == 'Add'){
      

       this.subScription= this.BuildingService.addData(payload).subscribe({
          next:(res:any)=>{
            this.toastr.show('تم اضافه البيانات بنجاح', 'success');
            this.getDataList()
    
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
            this.formData.reset();
        

      }else{

        this.BuildingService.updateData(this.idUpdate,payload).subscribe((res)=>{
          this.getDataList();
          this.toastr.show('تم تعديل البيانات بنجاح','success');
          this.formData.reset()
          this.btnText='Add'
        })

      }



    }else{
// this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
this.formData.markAllAsTouched();
    }
  }



  getUpdateData(id:any){
    this.btnText='Update';
    this.idUpdate=id;
    this.subScription = this.BuildingService.getUpdateData(id).subscribe((res:any)=>{
      console.log(res)
      this.formData.patchValue({
        name:res.name,
        address:res.address,
        ownerId:res.ownerId
      })
    })
  }


  resetData(){
    this.btnText='Add';
  }

  deleteId:any

  onClose(){
    this.show=false
  }

  deleteConfirmed(e:any){

    console.log(this.deleteId)

    this.show=false;


    this.BuildingService.deleteData(this.deleteId).subscribe({
    next:(res)=>{
      this.getDataList();
 this.toastr.show('تم حذف البيانات','success');      
    },
    error:(err)=>{
      
       this.toastr.show('لا يمكن حذف العنصر إذا كان به حركات','error'); 
    }
   })


  }
  deleteData(id:any){

    this.show=true;
    this.deleteId=id;
    
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subScription){
      this.subScription.unsubscribe();
    }
  }

  onPageChanged(page:any){
     this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  this.getDataList()
  }
}
