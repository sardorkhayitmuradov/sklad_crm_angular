import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const TOKEN = 'token';
export const EMPLOYER_ID = 'employer_id' || '';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = req.headers
      .set('Authorization', localStorage.getItem(TOKEN)!)
      .set('employer_id', localStorage.getItem(EMPLOYER_ID)!);
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
