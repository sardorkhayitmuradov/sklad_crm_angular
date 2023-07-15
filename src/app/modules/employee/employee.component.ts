import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'client',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {
  isCollapsed = false;

  constructor(private router: Router, private cookieService: CookieService){

  }

  logOut(){
    this.cookieService.delete("token");
    this.router.navigate(['/login']);
  }
}