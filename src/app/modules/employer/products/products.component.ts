import { Component } from '@angular/core';
import { Products, ProductsRequest } from './models/products.model';
import { Grid } from '../../shared/crud/grid.class';
import { pages } from './models/pages.model';
import { ProductsService } from './services/products.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseResponse } from '../../shared/models/base.interface';

@Component({
  selector: 'employer-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent extends Grid<Products, ProductsRequest> {
  isVisible = false;
  isOkLoading = false;
  isLoading = true;
  pages: pages = {
    page: 1,
    pageSize: 10,
    all: 0,
    pageSizeOptions: [10, 15, 20, 25, 30],
  };

  /// Input
  /**
   *
   */
  searchText = '';

  data: Products[] = [];

  constructor($data: ProductsService, private modal: NzModalService) {
    super($data);
    this.getData();
  }

  getData() {
    this.$data
      .getByPagination(this.pages.page, this.pages.pageSize)
      .subscribe((response: BaseResponse<Products[]>) => {
        this.data = response.data;
        this.pages.page = response.page;
        this.pages.pageSize = response.page_size;
        this.pages.all = response.all;
        this.isLoading = false;
      });
  }

  handlePageIndexChange(newPageIndex: number) {
    this.pages.page = newPageIndex;
    this.isLoading = true;
    this.getData();
  }

  handlePageSizeChange(newPageSize: number) {
    this.pages.pageSize = newPageSize;
    this.isLoading = true;
    this.getData();
  }

  showDeleteConfirm(id: string): void {
    this.modal.confirm({
      nzTitle: `Haqiqatdan o'chirmoqchimisiz ?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.delete(id);
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  /**
   *
   */
  clear() {
    this.searchText = '';
  }
}
