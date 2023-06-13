import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [{
  path: '',
  component: EmployeeComponent,
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
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
