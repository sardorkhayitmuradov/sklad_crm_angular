import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketsComponent } from './markets.component';

const routes: Routes = [
  {
    path: '',
    component: MarketsComponent,
  },
  {
    path: 'orders/:id',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
    data: {
      breadcrumb: 'Orders',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketsRoutingModule {}
