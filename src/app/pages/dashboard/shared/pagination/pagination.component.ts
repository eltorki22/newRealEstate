import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  imports:[NgFor],
  standalone:true,
})
export class PaginationComponent {

  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;

   @Output() pageChange = new EventEmitter<number>();

   
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }


    next() {
    this.goToPage(this.currentPage + 1);
  }

  previous() {
    this.goToPage(this.currentPage - 1);
  }


  pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }
}
