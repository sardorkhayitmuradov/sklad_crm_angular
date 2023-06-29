import { Injectable } from '@angular/core';
import { LoginResponse, LoginRequest } from '../model/login.model';
import { BaseService } from '../../shared/services/base.service';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends AuthService<LoginResponse, LoginRequest> {
  /**
   *
   */
  override url = 'employee';

  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base);
  }

}
