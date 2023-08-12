import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrdersComponent } from './add-orders.component';

const routes: Routes = [
  {
    path: '',
    component: AddOrdersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOrdersRoutingModule {}
