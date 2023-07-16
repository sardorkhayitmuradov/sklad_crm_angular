import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../models/base.interface';
// import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export abstract class CRUDService<TResponse, TRequest> {
  /**
   *
   */
  protected abstract url: string;

  /**
   *
   * @param http
   */
  constructor(private _base: BaseService) {}

  /**
   *
   * @returns
   */
  getAll() {
    return this._base.get<BaseResponse<TResponse[]>>(this.url);
  }

  /**
   *
   * @param id
   */
  getById(id: string) {
    return this._base.get<BaseResponse<TResponse[]>>(`${this.url}/${id}`);
  }

  /**
   *
   * @param model
   * @returns
   */
  add(model: TRequest) {
    return this._base.post<TResponse>(this.url, model);
  }

  /**
   *
   * @param model
   * @returns
   */
  edit(id: string, model: TRequest) {
    return this._base.put<TResponse>(`${this.url}/${id}`, model);
  }


  /**
   *
   * @param id
   */
  delete(id: string) {
    return this._base.delete<any>(`${this.url}/${id}`);
  }
}