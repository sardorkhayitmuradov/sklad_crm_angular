import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginResponse } from '../../login/model/login.model';
import { CookieService } from 'ngx-cookie-service';


export abstract class Auth<TResponse extends LoginResponse, TRequest> {

  abstract form: FormGroup;

  /**
   *
   * @param $teachers
   */
  constructor(
    protected $data: AuthService<TResponse, TRequest>,
    private $notification: NzNotificationService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   *
   * @param request
   */
  login(route: string) {
    const request = this.form.getRawValue();
    if(request?.phone_number){
      const countryCode = '+998';
      request.phone_number = formatter(countryCode + request.phone_number);
    } 

    if (this.form.valid) {
      this.$data.login(request).subscribe({
        next: (response) => {
          if (response.token) {
            if(route === 'admin'){
              // Set the cookie to expire in 1 day
              this.cookieService.set('superadmintoken', response.token);
            }
            this.cookieService.set('token', response.token);
            this.router.navigate([route]);
          }
        },
        error: (response) => {
          this.createNotification('error', response.error.error);
        },
      });
    } else {
      return this.updateValueAndValidity();
    }
  }

  /**
   *
   */
  register(request: TRequest) {
    this.$data.register(request).subscribe((item) => {
      if (item) {
        // this.router.navigate([route], { relativeTo: this.route });
        return;
      }
    });
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
      nzDuration: 0
    });
  }

  /**
   *
   */
  reset() {
    this.form.reset();
  }
}

export function formatter(phoneNumber: string) {
  let phone_number: string  = phoneNumber.replace(
   /^(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/,
   '$1-$2-$3-$4-$5'
 );
  return phone_number
}
