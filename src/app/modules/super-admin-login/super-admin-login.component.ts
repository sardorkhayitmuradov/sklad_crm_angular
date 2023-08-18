import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder
} from '@angular/forms';
import { SuperAdminLoginService } from './services/super-admin-login.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {  Router } from '@angular/router';
import { SuperAdminLoginRequest, SuperAdminLoginResponse } from './model/super-admin-login.model';
import { SuperAdminTokenModel } from './model/token.model';
import { TOKEN } from 'src/app/core/auth.inteceptor';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'super-admin-login',
  templateUrl: './super-admin-login.component.html',
  styleUrls: ['./super-admin-login.component.css'],
})
export class SuperAdminLoginComponent{
  tokenInfo?: SuperAdminTokenModel;
  isLogin: boolean = false;
  passwordVisible = false;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });


  constructor(
    private fb: FormBuilder,
    private $notification: NzNotificationService,
    private $auth: SuperAdminLoginService,
    private router: Router
  ) {}

  /**
   * 
   * @param token 
   * @returns 
   */
  private getDecodedAccessToken(token: string) {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }


  /**
   *
   * @param request
   */
  login() {
    this.isLogin = true;
    const request = this.form.getRawValue();

    if (this.form.valid) {
      this.$auth.login(request).subscribe({
        next: (response) => {
          if (response.token) {
            this.isLogin = false;
            localStorage.setItem(TOKEN, response.token);
            const token = localStorage.getItem(TOKEN)!;
            this.tokenInfo = this.getDecodedAccessToken(token) as SuperAdminTokenModel;
            this.router.navigate([`/admin`]);
          }
        },
        error: (response) => {
          this.isLogin = false;
          this.createNotification('error', response.error.error);
        },
      });
    } else {
      this.isLogin = false;
      return this.updateValueAndValidity();
    }
  }


  /**
   *
   */
  private updateValueAndValidity() {
    Object.values(this.form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  createNotification(type: string, error: any) {
    this.$notification.create(type, error, '', {
      nzPlacement: 'top',
      nzDuration: 0,
    });
  }

  /**
   *
   */
  reset() {
    this.form.reset();
  }
}
