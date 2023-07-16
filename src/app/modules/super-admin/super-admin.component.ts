import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { token } from './model/token.model';
import  jwt_decode from 'jwt-decode';

@Component({
  selector: 'superAdmin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})

export class SuperAdminComponent {
  isCollapsed = true;
  tokenInfo: token;

  constructor(private router: Router, private cookieService: CookieService){
    const token = this.cookieService.get('token');
    this.tokenInfo = this.getDecodedAccessToken(token)as token
  }

  private getDecodedAccessToken(token: string) {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  logOut(){
    this.cookieService.delete("token");
    this.cookieService.delete("employer_id");
    this.router.navigate(['/admin/login']);
  }
}