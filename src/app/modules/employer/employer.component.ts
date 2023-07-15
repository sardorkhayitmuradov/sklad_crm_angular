import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})

export class EmployerComponent {
  isCollapsed = false;

  constructor(private router: Router, private cookieService: CookieService){}

  logOut(){
    this.cookieService.delete("token");
    this.router.navigate(['/login']);
  }
}