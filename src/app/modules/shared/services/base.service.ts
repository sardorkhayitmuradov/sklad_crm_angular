import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
  constructor(private http: HttpClient) {}

  private getCookie(cname: string) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  private getHeaders() {
    const token = this.getCookie('token');

    let headers = new HttpHeaders().set(
      'Authorization', token
   );

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
