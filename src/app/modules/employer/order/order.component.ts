import { Component } from '@angular/core';
import { OrderService } from './services/order.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Grid } from '../../shared/crud/grid.class';
import { OrderRequest, OrderResponse, Products } from './model/order.model';

@Component({
  selector: 'employer-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent extends Grid<OrderResponse, OrderRequest> {
  id: string = '';

  isVisible = false;
  isOkLoading = false;
  isLoading = true;

  /**
   *
   */
  data: OrderResponse[] = [];

  constructor(
    $data: OrderService,
    private modal: NzModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super($data);
    this.id = route.snapshot.params['id'];
    this.getDataById();
  }

  /**
   *
   * @param id
   */
  getDataById() {
    this.$data.getById(this.id).subscribe((response: any) => {
      this.data = [response.data];
      this.isLoading = false;
    });
  }
}
