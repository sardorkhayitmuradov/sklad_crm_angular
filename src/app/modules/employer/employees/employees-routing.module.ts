import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { AddEditEmployeesComponent } from './add-edit-employees/add-edit-employees.component';
import { EmployeesResolver } from './services/employees.resolver';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
  {
    path: 'add',
    component: AddEditEmployeesComponent,
    data: {
      breadcrumb: 'Add',
    },
  },
  {
    path: 'edit/:id',
    component: AddEditEmployeesComponent,
    resolve: {
      data: EmployeesResolver,
    },
    data: {
      breadcrumb: 'Edit',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
