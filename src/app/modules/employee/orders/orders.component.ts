import { Component } from '@angular/core';
import { ordersData } from './services/orders.service';

@Component({
  selector: 'employee-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  datas = ordersData
}