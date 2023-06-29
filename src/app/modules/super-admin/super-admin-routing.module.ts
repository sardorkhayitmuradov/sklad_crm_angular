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
        import('./dashboard/dashboard.module').then((m)=> m.DashboardModule)
    },
    {
      path: 'markets',
      loadChildren: () => 
        import('./markets/markets.module').then((m)=> m.MarketsModule)
    },
    {
      path: 'products',
      loadChildren: () => 
        import('./products/products.module').then((m)=> m.ProductsModule)
    },
    {
      path: 'sales',
      loadChildren: () => 
        import('./sales/sales.module').then((m)=> m.SalesModule)
    },
    {
      path: 'admins',
      loadChildren: () => 
        import('./admins/admins.module').then((m)=> m.AdminsModule)
    },
    {
      path: 'finance',
      loadChildren: () => 
        import('./finance/finance.module').then((m)=> m.FinanceModule)
    },
    {
      path: 'clients',
      loadChildren: () => 
        import('./clients/clients.module').then((m)=> m.ClientsModule)
    },
    {
      path: 'orders',
      loadChildren: () => 
        import('./orders/orders.module').then((m)=> m.OrdersModule)
    },
    {
      path: 'settings',
      loadChildren: () => 
        import('./settings/settings.module').then((m)=> m.SettingsModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
