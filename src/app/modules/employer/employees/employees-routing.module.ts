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
      breadcrumbWithTranslate: 'actions.add',
    },
  },
  {
    path: 'edit/:id',
    component: AddEditEmployeesComponent,
    resolve: {
      data: EmployeesResolver,
    },
    data: {
      breadcrumbWithTranslate: 'actions.edit',
    },
  },
  {
    path: 'orders/:id',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
    data: {
      breadcrumbWithTranslate: 'employee.employeeOrders',
    },
  },
  {
    path: 'transactions/:id',
    loadChildren: () =>
      import('./transactions/transactions.module').then(
        (m) => m.TransactionsModule
      ),
    data: {
      breadcrumbWithTranslate: 'employee.employeeTransactions',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
