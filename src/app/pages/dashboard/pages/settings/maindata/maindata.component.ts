import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-maindata',
  templateUrl: './maindata.component.html',
  styleUrl: './maindata.component.scss'
})
export class MaindataComponent {
title:Title=inject(Title);



ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.title.setTitle('البيانات الرئيسيه')
}
}
