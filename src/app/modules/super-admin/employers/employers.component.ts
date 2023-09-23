import { Component } from '@angular/core';
import { Grid } from '../../shared/crud/grid.class';
import { EmployersRequest, Employers } from './models/employers.model';
import { EmployersService } from './services/employers.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'super-admin-employers',
  templateUrl: './employers.component.html',
})
export class EmployersComponent extends Grid<Employers, EmployersRequest> {
  isVisible = false;
  isOkLoading = false;
  isLoading = true;

  data: Employers[] = [];

  constructor($data: EmployersService, private modal: NzModalService,private router: Router) {
    super($data);
    this.getData()
  }


  getData(){
    this.data$.subscribe((response: any) => {
      this.data = response.employers;
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

  /**
   * 
   * @param id 
   */
  delete(id: string): void {
    this.$data.delete(id).subscribe(() => {
      this.getData();
    });
  }


  linkToEmployees(id: string) {
    // this.cookieService.set('employer_id', id);
    this.router.navigate([`admin/employers/employees/${id}`]);
  }
}
