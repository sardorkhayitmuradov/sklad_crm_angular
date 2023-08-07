// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Markets , MarketsRequest } from '../models/markets.models';
import { BaseService } from 'src/app/modules/shared/services/base.service';
import { CRUDService } from 'src/app/modules/shared/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class MarketsService extends CRUDService<Markets, MarketsRequest> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, 'market');
  }
}
