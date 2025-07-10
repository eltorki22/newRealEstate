import { Component, EventEmitter, Input, Output } from '@angular/core';

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






onClose(){
  this.toggleModal.emit(false);
}


onDeleteClick(){
  this.onDelete.emit(this.itemId);
}



}
