import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [CommonModule, EmployeeRoutingModule, SharedModule],
})
export class EmployeeModule {}
