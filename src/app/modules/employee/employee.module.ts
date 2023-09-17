import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeeLanguageComponent } from './components/language/language.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@NgModule({
  declarations: [EmployeeComponent, EmployeeLanguageComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    NzBreadCrumbModule,
  ],
})
export class EmployeeModule {}
