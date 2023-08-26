import { Injectable } from '@angular/core';
import { EmployerResponse, EmployerRequest } from '../model/role.model';
import { BaseService } from 'src/app/modules/shared/services/base.service';
import { CRUDService } from 'src/app/modules/shared/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class EmployerService extends CRUDService<
  EmployerResponse,
  EmployerRequest
> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, 'transaction');
  }
}
