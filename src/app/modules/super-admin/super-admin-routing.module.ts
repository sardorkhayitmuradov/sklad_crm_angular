import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';

const routes: Routes = [{
  path: '',
  component: SuperAdminComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => 
        import('./dashboard/dashboard.module').then((m)=> m.DashboardModule),
        data: {
          breadcrumb: 'Dashboard'
        },
    },
    {
      path: 'markets',
      loadChildren: () => 
        import('./markets/markets.module').then((m)=> m.MarketsModule),
        data: {
          breadcrumb: 'Markets'
        },
    },
    {
      path: 'products',
      loadChildren: () => 
        import('./products/products.module').then((m)=> m.ProductsModule),
        data: {
          breadcrumb: 'Products'
        },
    },
    {
      path: 'sales',
      loadChildren: () => 
        import('./sales/sales.module').then((m)=> m.SalesModule),
        data: {
          breadcrumb: 'Sales'
        },
    },
    {
      path: 'employers',
      loadChildren: () => 
        import('./employers/employers.module').then((m)=> m.EmployersModule),
        data: {
          breadcrumb: 'Employers'
        },
    },
    {
      path: 'clients',
      loadChildren: () => 
        import('./clients/clients.module').then((m)=> m.ClientsModule),
        data: {
          breadcrumb: 'Clients'
        },
    },
    {
      path: 'orders',
      loadChildren: () => 
        import('./orders/orders.module').then((m)=> m.OrdersModule),
        data: {
          breadcrumb: 'Orders'
        },
    },
    {
      path: 'settings',
      loadChildren: () => 
        import('./settings/settings.module').then((m)=> m.SettingsModule),
        data: {
          breadcrumb: 'Settings'
        },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
