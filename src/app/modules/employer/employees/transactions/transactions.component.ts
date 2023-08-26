import { Component, EventEmitter, Input, Output } from '@angular/core';
import { pages } from 'src/app/modules/shared/models/pages.model';
import { Grid } from 'src/app/modules/shared/crud/grid.class';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TransactionsRequest,
  TransactionsResponse,
} from './models/transactions.model';
import { TransactionsService } from './services/transactions.service';

@Component({
  selector: 'employer-transactions',
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent extends Grid<
  TransactionsResponse,
  TransactionsRequest
> {
  /**
   *
   */
  isVisible: boolean = false;

  isOkLoading = false;
  isLoading = true;

  pages: pages = {
    pageIndex: 1,
    pageSize: 10,
    all: 0,
    count: 0,
    pageSizeOptions: [10, 15, 20, 25, 30],
  };

  /**
   *
   */
  searchText: string = '';

  data: TransactionsResponse[] = [];

  constructor(
    $data: TransactionsService,
    private modal: NzModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super($data);
    const id = this.route.snapshot.params['id'];
    const pageIndex = +this.route.snapshot.queryParams['pageIndex'];
    const pageSize = +this.route.snapshot.queryParams['pageSize'];

    if (isFinite(pageSize)) {
      this.pages.pageSize = pageSize;
    }
    
    if (isFinite(pageIndex)) {
      this.pages.pageIndex = pageIndex;
    }
    this.getDatas(id);
  }

  protected getDatas(id: string) {
    this.$data.getEmployeeTransactions(id).subscribe(
      (response: any) => {
        this.data = response.data;
        console.log(response.data);
        this.isLoading = false;
      }
    )
  }

  /**
   *
   * @param pageIndex
   */
  handelPageIndex(pageIndex: number) {
    this.router.navigate([], { queryParams: { pageIndex } });
  }

  /**
   *
   */
  handlePageSize(pageSize: number) {
    this.router.navigate([], { queryParams: { pageSize } });
  }

  /**
   *
   */
  clear() {
    this.searchText = '';
  }
}
