// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployersRequest, Employers } from '../models/employers.model';
import { BaseService } from 'src/app/modules/shared/services/base.service';
import { CRUDService } from 'src/app/modules/shared/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class EmployersService extends CRUDService<
Employers,
  EmployersRequest
> {
  /**
   *
   */
  protected override url = 'employer';

  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base);
  }
}
