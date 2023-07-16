import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {
  isCollapsed = true;

  constructor(private router: Router, private cookieService: CookieService){

  }

  logOut(){
    this.cookieService.delete("token");
    this.router.navigate(['/login']);
  }
}