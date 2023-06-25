import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  /**
   *
   */
  private url = '/api/v1/';

  /**
   *
   * @param url
   * @returns
   */
  private makeUrl(url: string) {
    return `${this.url}${url}`;
  }

  /**
   *
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   *
   * @param url
   * @param params
   * @returns
   */
  get<T>(url: string, params?: HttpParams) {
    return this.http.get<T>(this.makeUrl(url), { params });
  }

  /**
   *
   * @param url
   * @param model
   * @returns
   */
  post<T>(url: string, model?: any) {
    return this.http.post<T>(this.makeUrl(url), model);
  }

  /**
   *
   * @param url
   * @param model
   * @returns
   */
  put<T>(url: string, model?: any) {
    return this.http.put<T>(this.makeUrl(url), model);
  }

  /**
   *
   * @param url
   * @param body
   * @returns
   */
  delete<T>(url: string, body?: any) {
    return this.http.delete<T>(this.makeUrl(url), { body });
  }
}
