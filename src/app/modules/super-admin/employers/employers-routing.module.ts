import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployersComponent } from './employers.component';
import { AddEmployersComponent } from './add-employers/add-employers.component';
import { EditEmployersComponent } from './edit-employers/edit-employers.component';
// import { EmployersResolver } from './services/employers.resolver';

const routes: Routes = [
  {
    path: '',
    component: EmployersComponent,
  },
  { 
    path: 'add', 
  component: AddEmployersComponent ,
  data: {
    breadcrumb: 'Add'
  },
},
  {
    path: 'edit/:id',
    component: EditEmployersComponent,
    // resolve: {
    //   data: EmployersResolver
    // },
    data: {
      breadcrumb: 'Edit'
    },
  },
  {
    path: 'employees/:id',
    loadChildren: () => 
      import('./employees/employees.module').then((m)=> m.EmployeesModule),
      data: {
        breadcrumb: 'Employees'
      },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployersRoutingModule {}
