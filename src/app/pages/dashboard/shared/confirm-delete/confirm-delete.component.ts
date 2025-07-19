import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss',
  standalone:true,
})
export class ConfirmDeleteComponent {
@Output() toggleModal=new EventEmitter();
@Output() onDelete=new EventEmitter();
@Input() itemId:any

  @ViewChild('modalRef') modalRef!: ElementRef;

 ngAfterViewInit() {
    // this.modalRef.nativeElement.focus(); // تعيين التركيز للمودال
     setTimeout(() => {
    this.modalRef.nativeElement.focus();
  }, 0);
  }


  @HostListener('document:keydown.enter', ['$event'])
handleEnter(event: KeyboardEvent) {
  this.onDeleteClick();
  this.onClose()

}


onClose(){
  this.toggleModal.emit(false);
  this.onClose();
}


onDeleteClick(){
  this.onDelete.emit(this.itemId);
}



}
