import { Injectable } from '@angular/core';
import {  SuperAdminLoginResponse, SuperAdminLoginRequest } from '../model/superAdminLogin.model';
import { BaseService } from '../../shared/services/base.service';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminLoginService extends AuthService<SuperAdminLoginResponse, SuperAdminLoginRequest> {
  /**
   *
   */
  override url = 'admin';

  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base);
  }

}
