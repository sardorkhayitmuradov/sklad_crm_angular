// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeBalanceModel } from '../models/role.model';
import { BaseService } from 'src/app/modules/shared/services/base.service';
import { CRUDService } from 'src/app/modules/shared/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends CRUDService<
  EmployeeBalanceModel,
  EmployeeBalanceModel
> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, 'employee');
  }
}
