import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
  } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
  

@Injectable({ providedIn: 'root' }) 

export class AuthGuard implements CanActivate {
  constructor(private router: Router,private cookieService: CookieService ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.cookieService.get('token');
    if (token) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}

