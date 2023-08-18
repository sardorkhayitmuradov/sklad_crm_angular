import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { role } from './model/role.model';
import  jwt_decode from 'jwt-decode';

@Component({
  selector: 'employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})

export class EmployerComponent {
  isCollapsed = true;
  tokenInfo: role;

  constructor(private router: Router, private cookieService: CookieService){
    const token = this.cookieService.get('token');
    this.tokenInfo = this.getDecodedAccessToken(token) as role
  }

  private getDecodedAccessToken(token: string) {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  logOut(){
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
}
}