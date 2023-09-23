import { Component } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { differenceInCalendarDays } from 'date-fns';
import {
  SoldProductsModel,
  dashboardModel,
  dashboardPages,
  remainedProductsModel,
} from './models/dashboard.model';
import { DashboardService } from './services/dashboard.service';
import { months } from '../balances/constants/date';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'employee-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard-component.css'],
})
export class DashboardComponent {
  isLoading = true;
  today = new Date();
  notFound: string = '';

  month: string[] = [];

  pages: dashboardPages = {
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
  SoldProducts: SoldProductsModel[] = [];
  RemainedProducts: remainedProductsModel[] = [];
  view: [number, number] = [700, 460];

  soldProductsLegendPosition: LegendPosition = LegendPosition.Below;

  soldProductsColorScheme: Color = {
    domain: ['#1890ff'],
    name: 'Color Scheme',
    selectable: false,
    group: ScaleType.Linear,
  };

  constructor(
    private $data: DashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const pageYear = +this.route.snapshot.queryParams['year'];
    const pageMonth = this.route.snapshot.queryParams['month'];

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
    const getMonth = month ? month : months[this.today.getMonth()];
    this.pages.month = getMonth;
    this.$data
      .getStatistics(year, getMonth)
      .subscribe((response: dashboardModel) => {
        if (response === null) {
          this.notFound = 'Statistics not found';
          this.isLoading = false;
        }
        this.SoldProducts = response.products.map((p) => {
          return {
            name: p.code,
            value: p.soldQty,
          };
        });

        this.RemainedProducts = response.products.map((p) => {
          return {
            name: p.code,
            value: p.inStoreQty,
          };
        });
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
    this.pages.month = month;
    this.pages.year = year;

    if (searchDate) {
      this.router.navigate([], {
        queryParams: { year: this.pages.year, month: this.pages.month },
      });
      this.isLoading = true;
      this.getDatas(year, month);
    }

    if (searchDate === null) {
      this.getDatas(this.pages.year, this.pages.month);
      this.isLoading = false;
    }
  }

  changeRoute() {
    this.router.navigate([], {
      queryParams: {
        year: this.pages.year,
        month: months[this.today.getMonth()],
      },
    });

    this.pages.month = months[this.today.getMonth()];
    this.notFound = '';
  }

  clear() {
    this.searchText = '';
    this.handleSearchTextChange(this.searchText);
  }
}
