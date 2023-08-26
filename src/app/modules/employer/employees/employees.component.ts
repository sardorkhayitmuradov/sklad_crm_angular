import { Component } from '@angular/core';
import { EmployeesService } from './services/employees.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Employees, EmployeesRequest } from './model/employees.model';
import { Grid } from '../../shared/crud/grid.class';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'employer-employees',
  templateUrl: './employees.component.html',
})
export class EmployeesComponent extends Grid<Employees, EmployeesRequest> {
  isVisible = false;
  isOkLoading = false;
  isLoading = true;

  data: Employees[] = [];

  /// Input
  /**
   *
   */
  searchText = '';

  constructor(
    $data: EmployeesService,
    private modal: NzModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super($data);
    this.getDatas();
  }

  protected getDatas() {
    this.$data.getAll().subscribe((response: any) => {
      this.data = response.employees;
      this.isLoading = false;
    });
  }

  showDeleteConfirm(id: string): void {
    this.modal.confirm({
      nzTitle: `Haqiqatdan o'chirmoqchimisiz ?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.isLoading = true;
        this.delete(id);
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  /**
   *
   * @param id
   */
  delete(id: string): void {
    this.$data.delete(id).subscribe(
      (w) => {
        if (w.message) {
          this.getDatas();
        }
      },
      (error) => {
        console.error('Delete error:', error);
      }
    );
  }

  /**
   *
   */
  add() {
    if (this.isVisible === undefined) {
      this.router.navigate(['add'], { relativeTo: this.route });
      return;
    }

    this.isVisible = true;
  }

  /**
   *
   */
  clear() {
    this.searchText = '';
  }
}
