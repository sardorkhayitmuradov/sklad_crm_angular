import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [{
  path: '',
  component: ClientComponent,
  children: [
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
      path: 'markets-more',
      loadChildren: () => 
        import('./markets-more/markets-more.module').then((m)=> m.MarketsMoreModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
