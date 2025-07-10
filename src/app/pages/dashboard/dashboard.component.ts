import { Component, inject } from '@angular/core';
import { ConfirmDeleteService } from '../../shared/services/confirm-delete.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  isSidebarVisible: boolean = true;
  confirmDelete:ConfirmDeleteService=inject(ConfirmDeleteService);


  handleSidebarChange(visiable:boolean){
    this.isSidebarVisible=visiable;
  }





}
