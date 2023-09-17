import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/modules/shared/services/base.service';
import { CRUDService } from 'src/app/modules/shared/services/crud.service';
import { BalancesModel } from '../models/balances.model';

@Injectable({
  providedIn: 'root',
})
export class BalancesService extends CRUDService<BalancesModel, BalancesModel> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, 'balances');
  }
}
