import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { MarketsService } from './markets.service';
import { Markets } from '../models/markets.models';
import { BaseResponse } from 'src/app/modules/shared/models/base.interface';

export const MarketsResolver: ResolveFn<BaseResponse<Markets[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(MarketsService).getById(route.params['id']);
};
