import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { UnitService } from '../../../../../shared/services/unit.service';
import { Unit } from '../../../../../shared/Models/unit';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { Building } from '../../../../../shared/Models/building';
import { BuildingService } from '../../../../../shared/services/building.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-loneliness',
  templateUrl: './loneliness.component.html',
  styleUrl: './loneliness.component.scss'
})
export class LonelinessComponent {

   BuildingService:BuildingService=inject(BuildingService);
  
    subScription!:Subscription;
    UnitServices:UnitService=inject(UnitService)
    getAllData:any;
    getBuildingData:Building[]=[];

    pageIndex=1
    pageSize=10
    btnText='Add'
    idUpdate:any
  
    show=false
  
    fb:FormBuilder=inject(FormBuilder);
  
    toastr:ToastrService=inject(ToastrService);
 
    

    formData=this.fb.group({
      unitNumber:['',[Validators.required]],
      unitName:['',[Validators.required]],
      roomCount:['',[Validators.required]],
      propertyId:[null,[Validators.required]],
      floorNumber:['',[Validators.required]],
      price:['',[Validators.required]],
      description:['']
    })
  
    title:Title=inject(Title)
  
    ngOnInit(){
      this.title.setTitle('الوحده')
      this.getAllListData();
      this.getListBuilding();
    }



    refreshData(){
      location.reload();
    }

    onSubmit(){

      if(this.formData.valid){
  let payload={
  propertyId: this.formData.get('propertyId')?.value ?? '',
  unitNumber: this.formData.get('unitNumber')?.value ?? '',
  unitName:  this.formData.get('unitName')?.value ?? '',
  floorNumber: this.formData.get('floorNumber')?.value ?? '',
  roomCount: this.formData.get('roomCount')?.value ?? '',
  price: this.formData.get('price')?.value ?? '',
  description: this.formData.get('description')?.value ?? ''
}
      if(this.btnText == 'Add'){

        this.subScription=this.UnitServices.addData(payload).subscribe({
          next:(res:any)=>{
             this.toastr.show('تم اضافه البيانات بنجاح', 'success');
            this.getAllListData();
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

      }else{

        this.subScription=this.UnitServices.updateData(this.idUpdate,payload).subscribe((res)=>{
              this.toastr.show('تم تعديل البيانات بنجاح', 'success');
            this.getAllListData();
            this.btnText='Add'
            
        })
      }

      this.formData.reset();
      }else{
        // this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
        this.formData.markAllAsTouched();
      }
    

    }


    resetData(){
      this.btnText='Add';
    }
    getAllListData(){

      let pagination={
  pageIndex: this.pageIndex,
  pageSize: this.pageSize
}
      this.subScription=this.UnitServices.getAllListData(pagination).subscribe((res:any)=>{
        this.getAllData=res;
        console.log(this.getAllData)
      })

    }



    getListBuilding(){
      this.subScription=this.BuildingService.getDataList().subscribe((res:any)=>{
        this.getBuildingData=res.rows;
        console.log(this.getBuildingData)
      })
    }
ValidationNumber(e: any): void {

   const charCode = e.key.charCodeAt(0);
  if (charCode < 48 || charCode > 57) {
    e.preventDefault(); // تمنع الكتابة
  }
}

getUpdateData(id:any){
  this.subScription=this.UnitServices.getUpdateData(id).subscribe((res:any)=>{
          let payload={
  propertyId: res.propertyId,
  unitNumber:res.unitNumber,
  unitName:  res.unitName,
  floorNumber:res.floorNumber,
  roomCount: res.roomCount,
  price: res.price,
  description: res.description
}

this.formData.patchValue(payload);
this.idUpdate=id;
this.btnText='Update'



  })
}

deleteId:any

  DeleteModel(id:any){
    // this.confrimDelete.confirmResult$.subscribe(())
    this.show=true;
    this.deleteId=id;
    // console.log(this.deleteId)

  }

  

  deleteConfirmed(id:any){
    // console.log(id);
    this.show=false;
   this.subScription= this.UnitServices.deleteData(id).subscribe({
      
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
        this.subScription.unsubscribe()
      }
    }
  

    onPageChanged(page:any){
       this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
      this.getAllListData()
    }

}
