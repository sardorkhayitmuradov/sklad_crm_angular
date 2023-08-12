import { Component } from '@angular/core';
import { OrderService } from './services/order.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Grid } from '../../shared/crud/grid.class';
import { OrderRequest, OrderResponse } from './model/order.model';

@Component({
  selector: 'employee-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent extends Grid<OrderResponse, OrderRequest> {
  isVisible = false;
  isOkLoading = false;
  isLoading = true;

  data: OrderResponse[] = [];

  constructor(
    $data: OrderService,
    private modal: NzModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super($data);
    const Id = route.snapshot.params['id'];
    this.getDataById(Id)
  }

  getDataById(id: string) {
    this.$data
      .getById(id)
      .subscribe((response: any) => {
        this.data = [response.data];
        this.isLoading = false;
      });
  }

  showDeleteConfirm(id: string): void {
    this.modal.confirm({
      nzTitle: `Haqiqatdan o'chirmoqchimisiz ?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.delete(id);
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
