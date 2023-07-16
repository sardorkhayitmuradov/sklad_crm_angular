import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

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
    return `${environment.baseUrl}${this.url}${url}`;
  }

  /**
   *
   * @param http
   */
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getHeaders() {
    const token = this.cookieService.get('token');
    const employer_id = this.cookieService.get('employer_id') || '';

    let headers = new HttpHeaders()
      .set('Authorization', token)
      .set('employer_id', employer_id);

    return headers;
  }

  /**
   *
   * @param url
   * @param params
   * @returns
   */
  get<T>(url: string, params?: HttpParams) {
    return this.http.get<T>(this.makeUrl(url), {
      headers: this.getHeaders(),
      params,
    });
  }

  /**
   *
   * @param url
   * @param model
   * @returns
   */
  post<T>(url: string, model?: any) {
    return this.http.post<T>(this.makeUrl(url), model, {
      headers: this.getHeaders(),
    });
  }

  /**
   *
   * @param url
   * @param model
   * @returns
   */
  put<T>(url: string, model?: any) {
    return this.http.put<T>(this.makeUrl(url), model, {
      headers: this.getHeaders(),
    });
  }

  /**
   *
   * @param url
   * @param body
   * @returns
   */
  delete<T>(url: string, body?: any) {
    return this.http.delete<T>(this.makeUrl(url), {
      headers: this.getHeaders(),
    });
  }
}
