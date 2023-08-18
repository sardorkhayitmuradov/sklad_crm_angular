import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/modules/shared/services/base.service';
import { SuperAdminLoginResponse, SuperAdminLoginRequest } from '../model/super-admin-login.model';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminLoginService {
 /**
   *
   * @param $base
   */
 constructor(private $base: BaseService) {}

 /**
   *
   * @param model
   * @returns
   */
 login(model: SuperAdminLoginRequest) {
  return this.$base.post<SuperAdminLoginResponse>(`admin/login`, model)
}

}
