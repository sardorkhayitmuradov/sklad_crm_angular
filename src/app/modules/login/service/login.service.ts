import { Injectable } from '@angular/core';
import { LoginResponse, LoginRequest } from '../model/login.model';
import { BaseService } from '../../shared/services/base.service';
import { CRUDService } from '../../shared/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends CRUDService<LoginResponse, LoginRequest> {
  /**
   *
   */
  protected override url = 'employee/login';

  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base);
  }
}
