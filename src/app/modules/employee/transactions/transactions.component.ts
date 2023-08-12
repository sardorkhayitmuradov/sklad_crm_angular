import { Component, EventEmitter, Input, Output } from '@angular/core';
import { pages } from '../../shared/models/pages.model';
import { Grid } from '../../shared/crud/grid.class';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TransactionsRequest,
  TransactionsResponse,
} from './models/transactions.model';
import { TransactionsService } from './services/transactions.service';

@Component({
  selector: 'employee-transactions',
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
    this.getDatas();
    const pageIndex = +this.route.snapshot.queryParams['pageIndex'];
    const pageSize = +this.route.snapshot.queryParams['pageSize'];

    if (isFinite(pageSize)) {
      this.pages.pageSize = pageSize;
    }

    if (isFinite(pageIndex)) {
      this.pages.pageIndex = pageIndex;
    }
  }

  protected getDatas() {
    this.data$.subscribe((response: any) => {
      this.data = response.data;
      this.isLoading = false;
    });
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
  add() {
    if (this.isVisible === undefined) {
      this.router.navigate(['add'], { relativeTo: this.route });
      return;
    }

    this.isVisible= true;
  }

  /**
   *
   */
  clear() {
    this.searchText = '';
  }
}
