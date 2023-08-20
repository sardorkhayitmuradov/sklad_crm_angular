import { Component } from '@angular/core';
import { Markets, MarketsRequest } from './models/markets.models';
import { pages } from '../../shared/models/pages.model';
import { Grid } from '../../shared/crud/grid.class';
import { MarketsService } from './services/markets.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseResponse } from '../../shared/models/base.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'employee-markets',
  templateUrl: './markets.component.html',
})
export class MarketsComponent extends Grid<Markets, MarketsRequest> {
  isVisible = false;
  isOkLoading = false;
  isLoading = true;

  /**
   *
   */
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

  data: Markets[] = [];

  constructor(
    $data: MarketsService,
    private modal: NzModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super($data);
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

  /**
   *
   * @param pageIndex
   * @param pageSize
   */
  getData(pageIndex: number, pageSize: number) {
    this.$data
      .getByPagination(pageIndex, pageSize)
      .subscribe((response: BaseResponse<Markets[]>) => {
        this.data = response.data;
        this.pages.pageIndex = response.page;
        this.pages.pageSize = response.page_size;
        this.pages.all = response.all;
        this.isLoading = false;
      });
  }

  /**
   *
   * @param newPageIndex
   */
  handlePageIndexChange(newPageIndex: number) {
    this.pages.pageIndex = newPageIndex;
    this.isLoading = true;
    this.router.navigate([], {
      queryParams: { pageIndex: newPageIndex, pageSize: this.pages.pageSize },
    });
    this.getData(this.pages.pageIndex, this.pages.pageSize);
  }

  /**
   *
   * @param newPageSize
   */
  handlePageSizeChange(newPageSize: number) {
    this.pages.pageSize = newPageSize;
    this.isLoading = true;
    this.router.navigate([], {
      queryParams: { pageIndex: this.pages.pageIndex, pageSize: newPageSize },
    });
    this.getData(this.pages.pageIndex, this.pages.pageSize);
  }

  /**
   *
   * @param searchText
   */
  handleSearch(searchText: string) {
    this.isLoading = true;
    this.$data
      .getDatasBySearch(searchText)
      .subscribe((response: BaseResponse<Markets[]>) => {
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
      this.getData(this.pages.pageIndex, this.pages.pageSize);
    }
  }

  /**
   *
   */
  clear() {
    this.searchText = '';
    this.handleSearchTextChange(this.searchText);
  }
}
