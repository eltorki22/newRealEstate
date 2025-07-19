import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ExchangesalariesService } from '../../../../../shared/services/tools/exchangesalaries.service';
import { EmployeesService } from '../../../../../shared/services/tools/employees.service';
import { AccountsService } from '../../../../../shared/services/tools/accounts.service';
import { ToastrService } from '../../../../../shared/services/toastr.service';
import { Subscription } from 'rxjs';
import { getTodayDate } from '../../../../../shared/validations/datehelpers';

@Component({
  selector: 'app-exchangesalaries',
  templateUrl: './exchangesalaries.component.html',
  styleUrl: './exchangesalaries.component.scss'
})
export class ExchangesalariesComponent implements OnInit {

  exChangeForms!: FormGroup;
  rowForm!: FormGroup;
  getAllData: any[] = [];
  getNameEmployee: any[] = [];
  accountNameData: any[] = [];
  editIndex: number | null = null;
  subScription!: Subscription;

  EmployeeService = inject(EmployeesService);
  exChangeSalariesser = inject(ExchangesalariesService);
  accountser = inject(AccountsService);
  fb = inject(FormBuilder);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getEmployeeName();
    this.getAccountName();

    this.exChangeForms = this.fb.group({
      voucherNumber: ['', Validators.required],
      voucherDate: [getTodayDate(), Validators.required]
    });

    this.rowForm = this.fb.group({
      employeeId: [null, Validators.required],
      baseSalary: [0, Validators.required],
      accountId: [null, Validators.required],
      absenceDays: [0],
      deductions: [0],
      bonuses: [0],
      loanRepayment: [0]
    });
  }

  getFormControl(controlName: string): FormControl {
    return this.rowForm.get(controlName) as FormControl;
  }

  getEmployeeName() {
    const pagination = { pageIndex: 0, pageSize: 0 };
    this.subScription = this.exChangeSalariesser.getEmployeesalary().subscribe((res: any) => {
      this.getNameEmployee = res.rows.map((item: any) => ({
        id: item.id,
        fullName: item.fullName,
        salary: item.salary,
        remainingAmount: item.remainingAmount
      }));
    });
  }

  getAccountName() {
    const pagination = { pageIndex: 0, pageSize: 0 };
    this.subScription = this.accountser.getAllDataList(pagination).subscribe((res: any) => {
      this.accountNameData = res.rows.map((item: any) => ({
        id: item.id,
        accountName: item.accountName
      }));
    });
  }

  ChangeSelectEmp(event: any) {
    const id = +event.target.value;
    const selected = this.getNameEmployee.find((e) => e.id === id);
    if (selected) {
      this.rowForm.patchValue({
        baseSalary: selected.salary,
        loanRepayment: selected.remainingAmount
      });
    }
  }

  AddDataSalary() {
    const formValue = this.rowForm.value;

    if (!this.rowForm.valid) {
      this.toastr.show('يرجى تعبئة جميع حقول الموظف', 'error');
      return;
    }

    const item = {
      employeeId: +formValue.employeeId,
      baseSalary: +formValue.baseSalary || 0,
      accountId: +formValue.accountId,
      absenceDays: +formValue.absenceDays || 0,
      deductions: +formValue.deductions || 0,
      bonuses: +formValue.bonuses || 0,
      loanRepayment: +formValue.loanRepayment || 0,
      netSalary: (+formValue.baseSalary || 0) - (+formValue.deductions || 0) - (+formValue.loanRepayment || 0) + (+formValue.bonuses || 0)
    };

    if (this.editIndex !== null) {
      this.getAllData[this.editIndex] = item;
      this.editIndex = null;
    } else {
      this.getAllData.push(item);
    }

    this.rowForm.reset({
      employeeId: null,
      baseSalary: 0,
      accountId: null,
      absenceDays: 0,
      deductions: 0,
      bonuses: 0,
      loanRepayment: 0
    });
  }

  getEmployeeNameById(id: number): string {
    const emp = this.getNameEmployee.find((e: any) => e.id === id);
    return emp ? emp.fullName : '';
  }

  getAccountNameById(id: number): string {
    const acc = this.accountNameData.find((e: any) => e.id === id);
    return acc ? acc.accountName : '';
  }

  editRow(index: number) {
    this.rowForm.patchValue(this.getAllData[index]);
    this.editIndex = index;
  }

  deleteRow(index: number) {
    this.getAllData.splice(index, 1);
  }

  onSubmit() {
    if (this.exChangeForms.valid && this.getAllData.length > 0) {
      const payload = {
        voucherNumber: this.exChangeForms.value.voucherNumber,
        voucherDate: this.exChangeForms.value.voucherDate,
        employeeSalarySheets: this.getAllData
      };

      this.exChangeSalariesser.addData(payload).subscribe(() => {
        this.toastr.show('تم إضافة البيانات بنجاح', 'success');
        this.exChangeForms.reset({
          voucherDate: getTodayDate()
        });
        this.getAllData = [];
      });
    } else {
      this.toastr.show('يرجى تعبئة جميع الحقول بشكل صحيح', 'error');
      this.exChangeForms.markAllAsTouched();
    }
  }
}
