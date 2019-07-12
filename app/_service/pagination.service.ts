import { Injectable } from '@angular/core';
import { Pagination } from '../_models/pagination';
import { PageEvent } from '@angular/material';

@Injectable()
// @Injectable({
//   providedIn: 'root'
// })
export class PaginationService {

  private paginationModal: Pagination;

constructor() {
  this.paginationModal = new Pagination;
}

get page(): number {
  return this.paginationModal.currentPage;
}
get selectedItemsPerPage(): number[] {
  return this.paginationModal.itemsPerPage;
}
get pageCount() {
  return this.paginationModal.totalItems;
}

change(pageEvent: PageEvent) {
  this.paginationModal.currentPage = pageEvent.pageIndex + 1;
  this.paginationModal.totalPages = pageEvent.pageSize;
  this.paginationModal.totalItems = pageEvent.length;
}
}
