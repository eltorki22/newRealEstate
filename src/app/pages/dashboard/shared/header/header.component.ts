import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  // showSidebar=false;


  @Output('showSidebar') showSidebar = new EventEmitter<any>();
  route:Router=inject(Router)
  sidebarVisible: boolean = true;



  changeData(){
    this.sidebarVisible=!this.sidebarVisible;
    this.showSidebar.emit(this.sidebarVisible);
  }


  logout(){
    this.route.navigate(['login'])
    localStorage.removeItem('token')
  }
}
