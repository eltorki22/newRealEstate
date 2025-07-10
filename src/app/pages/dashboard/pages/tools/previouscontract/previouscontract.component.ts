import { Component, ElementRef, inject, Renderer2, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-previouscontract',
  templateUrl: './previouscontract.component.html',
  styleUrl: './previouscontract.component.scss'
})
export class PreviouscontractComponent {
visibleFilter=false


@ViewChild('acco') acco!:ElementRef;
render:Renderer2=inject(Renderer2)
isOpen=false;
isOpenModal=false;
showAcco(){
  // this.render.addClass(this.acco.nativeElement,'active')
if (this.isOpen) {
      this.render.setStyle(this.acco.nativeElement, 'maxHeight', '81px');
    } else {
      const scrollHeight = this.acco.nativeElement.scrollHeight + 'px';
      this.render.setStyle(this.acco.nativeElement, 'maxHeight', scrollHeight);
    }
  this.isOpen = !this.isOpen;
}

ShowModel(){
this.isOpenModal=true;
}


}
