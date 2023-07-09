import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Grid } from '../../shared/crud/grid.class';
import { Employers, EmployersRequest, EmployersResponse } from './models/employers.model';
import { EmployersService } from './services/employers.service';

@Component({
  selector: 'employers',
  templateUrl: './employers.component.html',
})
export class EmployersComponent extends Grid<
  EmployersResponse,
  EmployersRequest
> {
  data?: Employers[] = [];
  isVisible = false;
  isOkLoading = false;
  isLoading = false;


  private destroy$ = new Subject<void>();

  constructor($data: EmployersService) {
    super($data);
    this.isLoading = true;
    // this.data$.pipe(takeUntil(this.destroy$)).subscribe((response: EmployersResponse) => {
    //   this.isLoading = false;
    //   this.data = response.employers;
    //   console.log(this.data);
    // });
    // console.log(this.data$);
  }

  showAddModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 2000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
