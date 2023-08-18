import { Component } from '@angular/core';
import { Router } from '@angular/router';
import  jwt_decode from 'jwt-decode';
import { role } from './models/role.model';
import { TOKEN } from 'src/app/core/auth.inteceptor';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {
  isCollapsed = true;
  tokenInfo: role;

  constructor(private router: Router){
    const token = localStorage.getItem(TOKEN)!;
    this.tokenInfo = this.getDecodedAccessToken(token) as role;
  }

  private getDecodedAccessToken(token: string) {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  logOut(){
    localStorage.removeItem(TOKEN)
    this.router.navigate(['/login']);
}
}