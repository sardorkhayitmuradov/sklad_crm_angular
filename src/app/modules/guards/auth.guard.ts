import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
  } from '@angular/router';
import { Observable } from 'rxjs';
import { TOKEN } from 'src/app/core/auth.inteceptor';
  

@Injectable({ providedIn: 'root' }) 

export class AuthGuard implements CanActivate {
  constructor(private router: Router , private route: ActivatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      return true;
    }

    if(this.route.snapshot.queryParams['admin']){
      this.router.navigate(['/admin/login']);
    };

    this.router.navigate(['/login']);
    
    return false;
  }

}

