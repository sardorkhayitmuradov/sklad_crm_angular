import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { SuperAdminToken } from './model/token.model';

@Component({
  selector: 'superAdmin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
})
export class SuperAdminComponent {
  isCollapsed = true;
  // tokenInfo: SuperAdminToken;

  constructor(private router: Router) {
  }

  logOut() {
    // this.cookieService.delete('token');
    // this.cookieService.delete('employer_id');
    this.router.navigate(['/admin/login']);
  }
}
