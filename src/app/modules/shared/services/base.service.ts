import {
  HttpClient,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { shareReplay, of, catchError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

export const ENDPOINT = new InjectionToken<string>('endpoint');
import { TOKEN } from 'src/app/core/auth.inteceptor';

@Injectable({
  providedIn: 'root',
})
export class BaseService {

  /**
   *
   * @param url
   * @returns
   */
  private makeUrl(url: string) {
    return `${this.endpoint}${url}`;
  }

  /**
   *
   * @param http
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(ENDPOINT) private endpoint: string
  ) {}

  /**
   *
   * @returns
   */
  getRoute(): void {
    const route = this.route.snapshot.queryParams['admin'];
    if (route === 'admin') {
      this.router.navigate(['/admin/login']);
    }
    this.router.navigate(['/login']);
  }

  /**
   *
   * @param url
   * @param params
   * @returns
   */
  get<T>(url: string, params?: HttpParams) {
    return this.http
      .get<T>(this.makeUrl(url), {
        params,
      })
      .pipe(
        shareReplay(1),
        catchError((error) => {
          if (error.error.status === HttpStatusCode.Unauthorized) {
            localStorage.removeItem(TOKEN);
            this.getRoute();
          }
          return of(null as T);
        })
      );
  }

  /**
   *
   * @param url
   * @param model
   * @returns
   */
  post<T>(url: string, model?: any) {
    return this.http.post<T>(this.makeUrl(url), model).pipe(
      shareReplay(1),
      catchError((error) => {
        if (error.error.status === HttpStatusCode.Unauthorized) {
          localStorage.removeItem(TOKEN);
          this.getRoute();
        }
        return of(null as T);
      })
    );
  }

  /**
   *
   * @param url
   * @param model
   * @returns
   */
  put<T>(url: string, model?: any) {
    return this.http.put<T>(this.makeUrl(url), model).pipe(
      shareReplay(1),
      catchError((error) => {
        if (error.error.status === HttpStatusCode.Unauthorized) {
          localStorage.removeItem(TOKEN);
          this.getRoute();
        }
        return of(null as T);
      })
    );
  }

  /**
   *
   * @param url
   * @param body
   * @returns
   */
  delete<T>(url: string, body?: any) {
    return this.http.delete<T>(this.makeUrl(url)).pipe(
      shareReplay(1),
      catchError((error) => {
        if (error.error.status === HttpStatusCode.Unauthorized) {
          localStorage.removeItem(TOKEN);
          this.getRoute();
        }
        return of(null as T);
      })
    );
  }
}
