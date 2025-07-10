import { Component, inject } from '@angular/core';
import { AccountsService } from '../../../../../shared/services/tools/accounts.service';
import { Subscription } from 'rxjs';
import { EmployeesService } from '../../../../../shared/services/tools/employees.service';
import { ExchangesalariesService } from '../../../../../shared/services/tools/exchangesalaries.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-exchangesalaries',
  templateUrl: './exchangesalaries.component.html',
  styleUrl: './exchangesalaries.component.scss'
})
export class ExchangesalariesComponent {

  EmployeeService:EmployeesService=inject(EmployeesService);
  subScription!:Subscription;
  getNameEmployee:any
  exChangeSalariesser:ExchangesalariesService=inject(ExchangesalariesService)
  fb:FormBuilder=inject(FormBuilder);

  exChangeForms:any



  selectPrice:any
  ngOnInit(){
    this.getEmployeeName();
    this.exChangeForms=this.fb.group({
      
       voucherNumber: ['',Validators.required],
       voucherDate: ['',Validators.required],

      employeeId: [0,Validators.required],
         baseSalary: [0,Validators.required],
      accountId: [0,[Validators.required]],
  
     absenceDays: [0,Validators.required],
     deductions: [0,Validators.required], // خصومات,
     bonuses: [0,Validators.required], // مكافأه
     loanRepayment: [0,Validators.required]
   

    })
  }



  getEmployeeName(){
    let pagination={
      pageIndex:0,
      pageSize:0,
    }
    this.subScription=this.EmployeeService.getDataAllList(pagination).subscribe((res:any)=>{
      this.getNameEmployee = res.rows.map((item:any)=>{
        return {
          id:item.id,
          fullName:item.fullName,
          salary:item.salary

        }
      });

      // this.getNameAccount=res.rows
      // console.log(res);
      // this.selectPrice=
      console.log(this.getNameEmployee)
    })  
  }


  ChangeSelectEmp(e:any){
    // console.log(e.target.value);

    this.selectPrice=e.target.value

    // this.getNameEmployee.salary
    this.exChangeSalariesser.getEmployeesalary(e.target.value).subscribe((res:any)=>{
      this.selectPrice = res.salary || res.rows?.salary || 0;
    })

  }


  onSubmit(){
    if(this.exChangeForms.valid){

    }else{

    }
  }

}
