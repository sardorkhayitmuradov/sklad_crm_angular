import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { EditEmployeesComponent } from './edit-employees/edit-employees.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
  {
    path: 'add',
    component: AddEmployeesComponent,
    data: {
      breadcrumb: 'Add',
    },
  },
  {
    path: 'edit/:id',
    component: EditEmployeesComponent,
    // resolve: {
    //   data: EmployersResolver,
    // },
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
