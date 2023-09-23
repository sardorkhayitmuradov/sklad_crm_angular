import { Component, ViewChild } from '@angular/core';
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

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';

import { mostSoldProductsOptions } from './models/dashboard.model';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private translate: TranslateService,
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

  @ViewChild('chart') chart!: ChartComponent;
  public mostSoldProducts: mostSoldProductsOptions = {
    series: [
      {
        name: 'basic',
        data: [400, 430, 448, 470, 540, 580],
      },
    ],
    chart: {
      type: 'bar',
      height: 450,
      width: 700,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'center', // top, center, bottom
          orientation: 'horizontal',
        },
        columnWidth: '100%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: this.getTitle(),
      align: 'center',
    },
    xaxis: {
      categories: [
        'Product 1',
        'Product 2',
        'Product 3',
        'Product 4',
        'Product 5',
        'Product 6',
      ],
    },
  };

  getTitle() {
    const translatedMostSoldProducts = this.translate.instant(
      'statistics.mostSoldProducts'
    );
    const translatedMonth = this.translate.instant(
      'statistics.months.' + this.pages.month
    );

    const title = `${translatedMostSoldProducts} ${translatedMonth}`;
    return title;
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
