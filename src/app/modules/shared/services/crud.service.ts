import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpHeaders } from '@angular/common/http';

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
    console.log(this.url)
    return this._base.get<TResponse>(this.url);
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
  edit(id: number, model: TRequest) {
    return this._base.put<TResponse>(`${this.url}/${id}`, model);
  }

  /**
   *
   * @param id
   */
  getById(id: number) {
    return this._base.get<TResponse>(`${this.url}/${id}`);
  }

  /**
   *
   * @param id
   */
  delete(id: number) {
    return this._base.delete<any>(`${this.url}/${id}`);
  }
}