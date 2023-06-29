import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export abstract class AuthService<TResponse, TRequest> {
  /**
   *
   */
  url?: string;

  /**
   *
   * @param http
   */
  constructor(private _base: BaseService) {}

  /**
   *
   * @param model
   * @returns
   */
  login(model: TRequest) {
    return this._base.post<TResponse>(`${this.url}/login`, model);
  }

  /**
   *
   * @param model
   * @returns
   */
  register(model: TRequest) {
    return this._base.post<TResponse>(`${this.url}/register`, model);
  }
}
