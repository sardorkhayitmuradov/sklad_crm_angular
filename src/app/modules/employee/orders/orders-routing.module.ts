import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { AddOrdersComponent } from './add-orders/add-orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./add-orders/add-orders.module').then((m) => m.AddOrdersModule),
    data: {
      breadcrumb: 'Order',
    },
  },
  {
    path: 'order/:id',
    loadChildren: () =>
      import('../order/order.module').then((m) => m.OrdersModule),
    data: {
      breadcrumb: 'Order',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
