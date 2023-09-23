import { Injectable } from '@angular/core';
import { EmployerBalanceModel } from '../model/role.model';
import { BaseService } from 'src/app/modules/shared/services/base.service';
import { CRUDService } from 'src/app/modules/shared/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class EmployerService extends CRUDService<
  EmployerBalanceModel,
  EmployerBalanceModel
> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, 'employer');
  }
}
