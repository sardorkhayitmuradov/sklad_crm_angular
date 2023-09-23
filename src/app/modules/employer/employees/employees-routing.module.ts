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
      breadCrumbWithTranslate: 'Add',
    },
  },
  {
    path: 'edit/:id',
    component: AddEditEmployeesComponent,
    resolve: {
      data: EmployeesResolver,
    },
    data: {
      breadCrumbWithTranslate: 'Edit',
    },
  },
  {
    path: 'orders/:id',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
    data: {
      breadCrumbWithTranslate: "employee.employeeOrders",
    },
  },
  {
    path: 'transactions/:id',
    loadChildren: () =>
      import('./transactions/transactions.module').then((m) => m.TransactionsModule),
    data: {
      breadCrumbWithTranslate: "employee.employeeTransactions",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
