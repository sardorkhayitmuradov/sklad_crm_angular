import { Component } from '@angular/core';
import { BalancesModel, balancePages } from './models/balances.model';
import { Grid } from '../../shared/crud/grid.class';
import { BalancesService } from './services/balances.service';
import { ActivatedRoute, Router } from '@angular/router';
import { differenceInCalendarDays } from 'date-fns';
import { months } from './constants/date';

@Component({
  selector: 'employer-balances',
  templateUrl: './balances.component.html',
})
export class BalancesComponent extends Grid<BalancesModel, BalancesModel> {
  isLoading = true;
  today = new Date();

  pages: balancePages = {
    pageIndex: 1,
    pageSize: 10,
    all: 0,
    year: this.today.getFullYear(),
    month: months[this.today.getMonth()],
    count: 0, /// datas per page coming
    pageSizeOptions: [10, 15, 20, 25, 30],
  };

  /**
   * @Input
   */
  searchText = '';

  data: BalancesModel[] = [];

  constructor(
    $data: BalancesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super($data);
    const pageIndex = +this.route.snapshot.queryParams['pageIndex'];
    const pageSize = +this.route.snapshot.queryParams['pageSize'];
    const pageYear = +this.route.snapshot.queryParams['year'];
    const pageMonth = this.route.snapshot.queryParams['month'];

    if (isFinite(pageIndex)) {
      this.pages.pageIndex = pageIndex;
    }
    if (isFinite(pageSize)) {
      this.pages.pageSize = pageSize;
    }
    if (isFinite(pageYear)) {
      this.pages.year = pageYear;
    }
    this.pages.month = pageMonth;

    this.getDatas(this.pages.year, this.pages.month);
  }

  /**
   *
   * @param year
   * @param month
   */
  getDatas(year: number, month: string) {
    console.log(year, month);
    this.$data
      .getBalances(year, month ? month : '')
      .subscribe((response: any) => {
        this.data = response;
        this.isLoading = false;
      });
  }

  /**
   *
   * @param current
   * @returns
   */
  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) > 0;

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
  }

  /**
   *
   * @param searchText
   */
  handleSearchTextChange(searchDate: any) {
    const date = new Date(searchDate);

    const year = date.getFullYear();
    const month = months[date.getMonth()];

    if (searchDate) {
      console.log(month, year);
      this.isLoading = true;
      this.getDatas(year, month);
    }

    if (searchDate === null) {
      this.getDatas(this.pages.year, this.pages.month);
      this.isLoading = false;
    }
  }

  clear() {
    this.searchText = '';
    this.handleSearchTextChange(this.searchText);
  }
}
