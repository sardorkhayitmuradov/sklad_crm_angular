import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import  jwt_decode from 'jwt-decode';
import { role } from './models/role.model';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {
  isCollapsed = true;
  tokenInfo: role;

  constructor(private router: Router, private cookieService: CookieService){
    const token = this.cookieService.get('token');
    this.tokenInfo = this.getDecodedAccessToken(token) as role
    console.log(this.tokenInfo)
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
    this.router.navigate(['/login']);
  }
}