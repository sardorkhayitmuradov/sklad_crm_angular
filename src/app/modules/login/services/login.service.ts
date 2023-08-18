import { Injectable } from '@angular/core';
import { LoginResponse, LoginRequest } from '../model/login.model';
import { BaseService } from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService  {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {}

  /**
   * 
   * @param url 
   * @param model 
   * @returns 
   */
  login(url: string, model: LoginRequest){
   return this.$base.post<LoginResponse>(`${url}/login`, model)
  }

}