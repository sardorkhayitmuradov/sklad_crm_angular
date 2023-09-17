import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerComponent } from './employer.component';

const routes: Routes = [
  {
    path: '',
    component: EmployerComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: {
          breadcrumbWithTranslate: 'dashboard',
        },
      },
      {
        path: 'markets',
        loadChildren: () =>
          import('./markets/markets.module').then((m) => m.MarketsModule),
        data: {
          breadcrumbWithTranslate: 'markets.title',
        },
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
        data: {
          breadcrumbWithTranslate: 'products.title',
        },
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./employees/employees.module').then((m) => m.EmployeesModule),
        data: {
          breadcrumbWithTranslate: 'employee.title',
        },
      },
      {
        path: 'balances',
        loadChildren: () =>
          import('./balances/balances.module').then((m) => m.BalancesModule),
        data: {
          breadcrumbWithTranslate: 'balances',
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
export class EmployerRoutingModule {}
