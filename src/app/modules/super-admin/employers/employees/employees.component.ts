import { Component } from '@angular/core';
import { Employees, EmployeesRequest } from './models/employees.model';
import { Grid } from 'src/app/modules/shared/crud/grid.class';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EmployeesService } from './services/employees.service';

@Component({
  selector: 'super-admin-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent extends Grid<Employees, EmployeesRequest> {
  isVisible = false;
  isOkLoading = false;
  isLoading = true;

  data: Employees[] = [];

  constructor($data: EmployeesService, private modal: NzModalService) {
    super($data);
    this.data$.subscribe((response: any) => {
      this.data = response.employees;
        this.isLoading = false
    });
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