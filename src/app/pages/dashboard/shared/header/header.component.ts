import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { Router } from '@angular/router';
import { SendUserService } from '../../../../shared/services/settings/send-user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  // showSidebar=false;


  @Output('showSidebar') showSidebar = new EventEmitter<any>();
  sendUserSer:SendUserService=inject(SendUserService);
  subScription!:Subscription;
  route:Router=inject(Router)
  sidebarVisible: boolean = true;

  dataUser:any

  ngOnInit(){
    // this.dataUser=JSON.parse(localStorage.getItem('dataUser')!);
    // console.log(this.dataUser);
     this.subScription=this.sendUserSer.user$.subscribe((user) => {
      this.dataUser = user;
    });
  }

  changeData(){
    this.sidebarVisible=!this.sidebarVisible;
    this.showSidebar.emit(this.sidebarVisible);
  }


  logout(){
    this.route.navigate(['login'])
    localStorage.removeItem('token')
  }
}
