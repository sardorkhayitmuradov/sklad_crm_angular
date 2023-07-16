import { Component } from '@angular/core';
import { Grid } from '../../shared/crud/grid.class';
import { EmployersRequest, Employers } from './models/employers.model';
import { EmployersService } from './services/employers.service';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'employers',
  templateUrl: './employers.component.html',
})
export class EmployersComponent extends Grid<Employers, EmployersRequest> {
  isVisible = false;
  isOkLoading = false;
  isLoading = true;

  data: Employers[] = [];

  constructor($data: EmployersService, private modal: NzModalService, private cookieService: CookieService,private router: Router) {
    super($data);
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
        // this.data$.subscribe((response: any) => {
        //   this.data = response.employers;
        // });
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }


  linkToEmployees(id: string) {
    this.cookieService.set('employer_id', id);
    this.router.navigate([`admin/employers/employees/${id}`]);
  }
}
