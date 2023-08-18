import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { role } from './model/role.model';
import jwt_decode from 'jwt-decode';
import { TOKEN } from 'src/app/core/auth.inteceptor';

@Component({
  selector: 'employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css'],
})
export class EmployerComponent {
  isCollapsed = true;
  tokenInfo: role;

  constructor(private router: Router) {
    const token = localStorage.getItem(TOKEN)!;
    this.tokenInfo = this.getDecodedAccessToken(token) as role;
  }

  private getDecodedAccessToken(token: string) {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  logOut() {
    localStorage.removeItem(TOKEN);
    this.router.navigate(['/login']);
  }
}
