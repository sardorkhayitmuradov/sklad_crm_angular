import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { EmployeesComponent } from './employees.component';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { EditEmployeesComponent } from './edit-employees/edit-employees.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [EmployeesComponent, AddEmployeesComponent, EditEmployeesComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule
  ],
  providers: [
    provideNgxMask()
  ],
})
export class EmployeesModule { }
