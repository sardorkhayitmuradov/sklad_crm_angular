import { Component } from '@angular/core';
import { Products , ProductsRequest } from './models/products.model';
import { Grid } from '../../shared/crud/grid.class';
import { pages } from '../../shared/models/pages.model';
import { ProductsService } from './services/products.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseResponse } from '../../shared/models/base.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'employee-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent extends Grid<Products, ProductsRequest> {
  isVisible = false;
  isOkLoading = false;
  isLoading = true;


  pages: pages = {
    pageIndex: 1,
    pageSize: 10,
    all: 0,
    count: 0,
    pageSizeOptions: [10,15,20,25,30]
  };

   /**
   * @Input
   */
   searchText = '';
  data: Products[] = [];

  constructor($data: ProductsService, private modal: NzModalService, private router: Router , private route: ActivatedRoute) {
    super($data);
    const pageIndex = +this.route.snapshot.queryParams['pageIndex'];
    const pageSize = +this.route.snapshot.queryParams['pageSize'];
    
    if (isFinite(pageIndex)) {
      this.pages.pageIndex = pageIndex;
    }

    if(isFinite(pageSize)){
      this.pages.pageSize = pageSize;
    }
    
    this.getData(this.pages.pageIndex, this.pages.pageSize)
  }

  getData(pageIndex: number, pageSize: number) {
    this.$data
      .getByPagination(pageIndex, pageSize)
      .subscribe((response: BaseResponse<Products[]>) => {
        this.data = response.data;
        // console.log(this.data)
        this.pages.pageIndex = response.page;
        this.pages.pageSize = response.page_size;
        this.pages.all = response.all
        this.isLoading = false;
      });
  }


  handlePageIndexChange(newPageIndex: number){
    this.pages.pageIndex = newPageIndex;
    this.isLoading = true;
    this.router.navigate([], { queryParams: { pageIndex: newPageIndex , pageSize: this.pages.pageSize } });
    this.getData(this.pages.pageIndex , this.pages.pageSize);
  }

  handlePageSizeChange(newPageSize: number){
    this.pages.pageSize = newPageSize
    this.isLoading = true;
    this.router.navigate([], { queryParams: { pageIndex: this.pages.pageIndex , pageSize: newPageSize } });
    this.getData(this.pages.pageIndex, this.pages.pageSize);
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
