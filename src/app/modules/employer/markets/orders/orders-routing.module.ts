import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
  },
  // {
  //   path: 'add',
  //   component: AddEditProductsComponent,
  //   data: {
  //     breadcrumb: 'Add',
  //   },
  // },
  {
    path: 'order/:id',
    loadChildren: () =>
      import('../../order/order.module').then((m) => m.OrdersModule),
    data: {
      breadcrumb: 'Market Order',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
