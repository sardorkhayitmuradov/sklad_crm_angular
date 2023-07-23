import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { SharedModule } from '../../shared/shared.module';
import { AddEditEmployeesComponent } from './add-edit-employees/add-edit-employees.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    EmployeesComponent,
    AddEditEmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule,
  ],
  providers: [
    provideNgxMask()
  ],
})
export class EmployeesModule { }
