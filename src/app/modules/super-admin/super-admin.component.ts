import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'superAdmin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})

export class SuperAdminComponent {
  isCollapsed = true;

  constructor(private router: Router, private cookieService: CookieService){

  }

  logOut(){
    this.cookieService.delete("superadmintoken");
    this.router.navigate(['/admin/login']);
  }
}