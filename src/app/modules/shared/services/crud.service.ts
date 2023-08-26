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
  private url: string;

  /**
   *
   * @param http
   */
  constructor(private _base: BaseService, url: string) {
    this.url = url;
  }

  /**
   *
   * @returns
   */
  getAll() {
    return this._base.get<BaseResponse<TResponse[]>>(this.url);
  }

  /**
   *
   * @param url
   * @returns
   */
  getDatasBySearch(text: string, order?: string) {
    return this._base.get<BaseResponse<TResponse[]>>(
      `${order ?? this.url}?search=${text}`
    );
  }

  /**
   *
   * @param id
   * @returns
   */
  getEmployeeTransactions(id: string) {
    return this._base.get<BaseResponse<TResponse[]>>(
      `${this.url}?employeeId=${id}`
    );
  }

  /**
   *
   * @param id
   * @returns
   */
  getEmployeeOrders(page: number, pageSize: number, id: string) {
    return this._base.get<BaseResponse<TResponse[]>>(
      `${this.url}/pagination?page=${page}&pageSize=${pageSize}&employeeId=${id}`
    );
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
   * @param page pageSize
   */
  getByPagination(page: number, pageSize: number) {
    return this._base.get<BaseResponse<TResponse[]>>(
      `${this.url}/pagination?page=${page}&pageSize=${pageSize}`
    );
  }

  /**
   *
   * @param page pageSize
   */
  getByPaginationMarketId(page: number, pageSize: number, id?: string) {
    return this._base.get<BaseResponse<TResponse[]>>(
      `${this.url}/pagination?page=${page}&pageSize=${pageSize}&marketId=${id}`
    );
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
