import { Component } from '@angular/core';
import { Grid } from '../../shared/crud/grid.class';
import {  EmployersRequest, EmployersResponse } from './models/employers.model';
import { EmployersService } from './services/employers.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'employers',
  templateUrl: './employers.component.html',
})
export class EmployersComponent extends Grid<
  EmployersResponse,
  EmployersRequest
> {
  isVisible = false;
  isOkLoading = false;
  isLoading = false;

  constructor($data: EmployersService, private modal: NzModalService) {
    super($data);
    this.isLoading = true;
  }

  showDeleteConfirm(id: string): void {
    this.modal.confirm({
      nzTitle: `Haqiqatdan o'chirmoqchimisiz ?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.delete(id)
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
