import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
  ],
})
export class EmployeeModule {}
