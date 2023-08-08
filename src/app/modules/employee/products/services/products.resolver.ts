import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ProductsService } from './products.service';
import { Products } from '../models/products.model';
import { BaseResponse } from 'src/app/modules/shared/models/base.interface';

export const ProductsResolver: ResolveFn<BaseResponse<Products[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ProductsService).getById(route.params['id']);
};
