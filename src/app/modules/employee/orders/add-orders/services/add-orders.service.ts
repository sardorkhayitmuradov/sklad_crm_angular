import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/modules/shared/services/base.service';
import { CRUDService } from 'src/app/modules/shared/services/crud.service';
import { OrdersRequest, OrdersResponse, Products } from '../../model/orders.model';
import { Markets } from '../../../markets/models/markets.models';


@Injectable({
  providedIn: 'root',
})
export class AddOrdersService extends CRUDService<OrdersResponse, OrdersRequest> {

   /**
   *
   * @param $base
   */
   constructor(private $base: BaseService) {
    super($base, 'order');
  }

  /**
   *
   * @returns
   */
  getMarkets() {
    return this.$base.get<Markets[]>('market/pagination?page=1&pageSize=1000000');
  }

  /**
   *
   * @returns
   */
  getProducts() {
    return this.$base.get<Products[]>('product/pagination?page=1&pageSize=1000000');
  }

}

