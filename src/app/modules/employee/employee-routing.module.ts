import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      // {
      //   path: 'dashboard',
      //   loadChildren: () =>
      //     import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      //   data: {
      //     breadcrumb: 'Dashboard',
      //   },
      // },
      {
        path: 'markets',
        loadChildren: () =>
          import('./markets/markets.module').then((m) => m.MarketsModule),
        data: {
          breadcrumb: 'Markets',
        },
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
        data: {
          breadcrumb: 'Products',
        },
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule),
        data: {
          breadcrumb: 'Orders',
        },
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./transactions/transactions.module').then((m) => m.TransactionsModule),
        data: {
          breadcrumb: 'My transactions',
        },
      },
      // {
      //   path: 'settings',
      //   loadChildren: () =>
      //     import('./settings/settings.module').then((m) => m.SettingsModule),
      //   data: {
      //     breadcrumb: 'Settings',
      //   },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
