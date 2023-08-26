import { Component } from '@angular/core';
import { OrdersService } from './services/orders.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Grid } from 'src/app/modules/shared/crud/grid.class';
import { OrdersRequest, OrdersResponse } from './model/orders.model';
import { pages } from 'src/app/modules/shared/models/pages.model';
import { BaseResponse } from 'src/app/modules/shared/models/base.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'employer-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [DecimalPipe],
})
export class OrdersComponent extends Grid<OrdersResponse, OrdersRequest> {
  isVisible = false;
  isOkLoading = false;
  isLoading = true;

  employeeId: string = '';

  pages: pages = {
    pageIndex: 1,
    pageSize: 10,
    all: 0,
    qtyOrders: 0,
    count: 0,
    pageSizeOptions: [10, 15, 20, 25, 30],
  };

  searchText: string = '';
  data: OrdersResponse[] = [];

  constructor(
    $data: OrdersService,
    private modal: NzModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super($data);
    this.employeeId = this.route.snapshot.params['id'];
    const pageIndex = +this.route.snapshot.queryParams['pageIndex'];
    const pageSize = +this.route.snapshot.queryParams['pageSize'];

    if (isFinite(pageIndex)) {
      this.pages.pageIndex = pageIndex;
    }

    if (isFinite(pageSize)) {
      this.pages.pageSize = pageSize;
    }

    this.getData(this.pages.pageIndex, this.pages.pageSize, this.employeeId);
  }

  getQtyOrders(): number {
    return this.pages.qtyOrders ?? 0;
  }

  getData(pageIndex: number, pageSize: number, id: string) {
    this.$data
      .getEmployeeOrders(pageIndex, pageSize, id)
      .subscribe((response: BaseResponse<OrdersResponse[]>) => {
        this.data = response.data;
        this.pages.pageIndex = response.page;
        this.pages.pageSize = response.page_size;
        this.pages.qtyOrders = response.qtyOrders;
        this.isLoading = false;
      });
  }

  handlePageIndexChange(newPageIndex: number) {
    this.pages.pageIndex = newPageIndex;
    this.isLoading = true;
    this.router.navigate([], {
      queryParams: { pageIndex: newPageIndex, pageSize: this.pages.pageSize },
    });
    this.getData(this.pages.pageIndex, this.pages.pageSize, this.employeeId);
  }

  handlePageSizeChange(newPageSize: number) {
    this.pages.pageSize = newPageSize;
    this.isLoading = true;
    this.router.navigate([], {
      queryParams: { pageIndex: this.pages.pageIndex, pageSize: newPageSize },
    });
    this.getData(this.pages.pageIndex, this.pages.pageSize, this.employeeId);
  }

  /**
   *
   * @param searchText
   */
  handleSearch(searchText: string) {
    this.isLoading = true;
    this.$data
      .getDatasBySearch(searchText, 'order')
      .subscribe((response: BaseResponse<OrdersResponse[]>) => {
        this.data = response.data;
        this.isLoading = false;
      });
  }

  /**
   *
   * @param searchText
   */
  handleSearchTextChange(searchText: string) {
    if (searchText.length === 0) {
      this.isLoading = true;
      this.getData(this.pages.pageIndex, this.pages.pageSize, this.employeeId);
    }
  }

  clear() {
    this.searchText = '';
    this.handleSearchTextChange(this.searchText);
  }
}
