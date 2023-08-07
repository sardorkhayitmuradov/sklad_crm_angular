import { Component } from '@angular/core';
import { OrdersService } from './services/orders.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Grid } from '../../shared/crud/grid.class';
import { OrdersRequest, OrdersResponse, Products } from './model/orders.model';
import { pages } from '../../shared/models/pages.model';
import { BaseResponse } from '../../shared/models/base.interface';

@Component({
  selector: 'employee-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent extends Grid<OrdersResponse, OrdersRequest> {
  isVisible = false;
  isOkLoading = false;
  isLoading = true;

  pages: pages = {
    pageIndex: 1,
    pageSize: 10,
    all: 0,
    qtyOrders: 0,
    count: 0,
    pageSizeOptions: [10, 15, 20, 25, 30],
  };

  data: OrdersResponse[] = [];
  tabRoute: string = localStorage.getItem('tabRoute') as string | 'markets';

  constructor(
    $data: OrdersService,
    private modal: NzModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super($data);
    this.handleTabRoute(this.tabRoute);
    const pageIndex = +this.route.snapshot.queryParams['pageIndex'];
    const pageSize = +this.route.snapshot.queryParams['pageSize'];

    if (isFinite(pageIndex)) {
      this.pages.pageIndex = pageIndex;
    }

    if (isFinite(pageSize)) {
      this.pages.pageSize = pageSize;
    }

    this.getData(this.pages.pageIndex, this.pages.pageSize);
  }

  getQtyOrders(): number {
    return this.pages.qtyOrders ?? 0; // Provide a default value of 0 if pages.qtyOrders is undefined
  }

  getProductsId(productsId: Products[]) {
    return productsId?.map((product) => product.productId).join(', ');
  }

  getProductsQty(productsQty: Products[]) {
    return productsQty?.map((product) => product.qty).join(', ');
  }

  getProductsPrice(productsPrice: Products[]) {
    return productsPrice?.map((product) => product.price).join(', ');
  }

  getData(pageIndex: number, pageSize: number) {
    this.$data
      .getByPagination(pageIndex, pageSize)
      .subscribe((response: BaseResponse<OrdersResponse[]>) => {
        this.data = response.data;
        console.log(this.data);
        this.pages.pageIndex = response.page;
        this.pages.pageSize = response.page_size;
        this.pages.all = response.all;
        this.isLoading = false;
      });
  }

  handlePageIndexChange(newPageIndex: number) {
    this.pages.pageIndex = newPageIndex;
    this.isLoading = true;
    this.router.navigate([], {
      queryParams: { pageIndex: newPageIndex, pageSize: this.pages.pageSize },
    });
    this.getData(this.pages.pageIndex, this.pages.pageSize);
  }

  handlePageSizeChange(newPageSize: number) {
    this.pages.pageSize = newPageSize;
    this.isLoading = true;
    this.router.navigate([], {
      queryParams: { pageIndex: this.pages.pageIndex, pageSize: newPageSize },
    });
    this.getData(this.pages.pageIndex, this.pages.pageSize);
  }

  handleTabRoute(route: string) {
    this.router.navigate([], {
      queryParams: { tab: route },
      queryParamsHandling: 'merge',
    });
    localStorage.setItem('tabRoute', route);
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
}
