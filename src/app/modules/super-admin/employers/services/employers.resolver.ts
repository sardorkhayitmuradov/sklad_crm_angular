import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { EmployersService } from './employers.service';
import { Employers } from '../models/employers.model';
import { BaseResponse } from 'src/app/modules/shared/models/base.interface';

export const EmployersResolver: ResolveFn<BaseResponse<Employers[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(EmployersService).getById(route.params['id']);
};
