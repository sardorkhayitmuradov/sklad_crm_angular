// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products, ProductsRequest } from '../models/products.model';
import { BaseService } from 'src/app/modules/shared/services/base.service';
import { CRUDService } from 'src/app/modules/shared/services/crud.service';
import { BaseResponse } from 'src/app/modules/shared/models/base.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends CRUDService<Products, ProductsRequest> {

  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, 'product');
  }
}
