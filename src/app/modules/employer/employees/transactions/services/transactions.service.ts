import { Injectable } from '@angular/core';
import { TransactionsResponse, TransactionsRequest } from '../models/transactions.model';
import { BaseService } from 'src/app/modules/shared/services/base.service';
import { CRUDService } from 'src/app/modules/shared/services/crud.service';
import { BaseResponse } from 'src/app/modules/shared/models/base.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService extends CRUDService<TransactionsResponse, TransactionsRequest> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, 'transaction');
  }
}
