import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { EmployeesService } from './employees.service';
import { Employees } from '../model/employees.model';
import { BaseResponse } from 'src/app/modules/shared/models/base.interface';

export const EmployeesResolver: ResolveFn<BaseResponse<Employees[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(EmployeesService).getById(route.params['id']);
};
