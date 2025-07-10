import { Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sendmsg',
  templateUrl: './sendmsg.component.html',
  styleUrl: './sendmsg.component.scss'
})
export class SendmsgComponent {

  render:Renderer2=inject(Renderer2);
  @ViewChild('messageModal') messageModal!:ElementRef;
  @ViewChild('modal-backdrop') modal_backdrop!:ElementRef

  dataSelected:any;

  btnSelected(){
    var inputRadio=document.querySelector('input[name="msg"]:checked');
    // console.log(inputRadio)
    var dataLabel=document.querySelector(`label[for="${inputRadio?.getAttribute('id')}"]`);
    // console.log()

    this.dataSelected=dataLabel?.textContent

    // this.render.setStyle(this.messageModal.nativeElement,'display','none')

  // this.render.removeClass(this.messageModal.nativeElement,'show')


 
  

    
  }

}
