import { Component, OnInit } from '@angular/core';
import { Markets, MarketsRequest } from './models/markets.models';
import { pages } from './models/pages.model';
import { Grid } from '../../shared/crud/grid.class';
import { MarketsService } from './services/markets.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseResponse } from '../../shared/models/base.interface';

@Component({
  selector: 'employee-markets',
  templateUrl: './markets.component.html',
})
export class MarketsComponent extends Grid<Markets, MarketsRequest> {
  isVisible = false;
  isOkLoading = false;
  isLoading = true;
  pages: pages = {
    page: 1,
    pageSize: 10,
    all: 0,
    pageSizeOptions: [10,15,20,25,30]
  };

  data: Markets[] = [];

  constructor($data: MarketsService, private modal: NzModalService) {
    super($data);
    this.getData()
  }

  getData() {
    this.$data
      .getByPagination(this.pages.page, this.pages.pageSize)
      .subscribe((response: BaseResponse<Markets[]>) => {
        this.data = response.data;
        this.pages.page = response.page;
        this.pages.pageSize = response.page_size;
        this.pages.all = response.all
        this.isLoading = false;
      });
  }


  handlePageIndexChange(newPageIndex: number){
    this.pages.page = newPageIndex;
    this.isLoading = true;
    this.getData()
  }

  handlePageSizeChange(newPageSize: number){
    this.pages.pageSize = newPageSize
    this.isLoading = true;
    this.getData()
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
