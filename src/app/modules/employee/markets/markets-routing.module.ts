import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketsComponent } from './markets.component';
import { AddEditMarketsComponent } from './add-edit-markets/add-edit-markets.component';
import { MarketsResolver } from './services/markets.resolver';

const routes: Routes = [
  {
    path: '',
    component: MarketsComponent,
  },
  // {
  //   path: 'add',
  //   component: AddEditMarketsComponent,
  //   data: {
  //     breadcrumb: 'Add',
  //   },
  // },
  // {
  //   path: 'edit/:id',
  //   component: AddEditMarketsComponent,
  //   resolve: {
  //     data: MarketsResolver,
  //   },
  //   data: {
  //     breadcrumb: 'Edit',
  //   },
  // },
  {
    path: 'orders/:id',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
    data: {
      breadcrumbWithTranslate: 'markets.market_orders',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketsRoutingModule {}
