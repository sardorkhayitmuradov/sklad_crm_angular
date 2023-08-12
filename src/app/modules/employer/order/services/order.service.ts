// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Markets , MarketsRequest } from '../models/markets.models';
import { BaseService } from 'src/app/modules/shared/services/base.service';
import { CRUDService } from 'src/app/modules/shared/services/crud.service';
import { OrderRequest, OrderResponse } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends CRUDService<OrderResponse, OrderRequest> {

   /**
   *
   * @param $base
   */
   constructor(private $base: BaseService) {
    super($base, 'order');
  }
}

