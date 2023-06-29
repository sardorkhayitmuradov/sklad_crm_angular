import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginResponse } from '../../login/model/login.model';

export abstract class Auth<TResponse extends LoginResponse, TRequest> {
  /**
   *
   */
  protected phone_number?: string;
  abstract form: FormGroup;

  /**
   *
   * @param $teachers
   */
  constructor(
    protected $data: AuthService<TResponse, TRequest>,
    private $notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /*
   *
   */
  formatter(phoneNumber: string) {
    this.phone_number = phoneNumber.replace(
      /^(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/,
      '$1-$2-$3-$4-$5'
    );
  }

  /**
   *
   * @param request
   */
  login(route: string) {
    const request = this.form.getRawValue();
    if(request?.phone_number){
      const countryCode = '+998';
      this.formatter(countryCode + request.phone_number);
      request.phone_number = this.phone_number;
    }

    if (this.form.valid) {
      this.$data.login(request).subscribe({
        next: (response) => {
          if (response.token) {
            // Set the cookie to expire in 1 day
            this.setCookie('token', response.token, 1);
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


  private setCookie(name: string, value: string, days: number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
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
      nzDuration: 3000,
    });
  }

  /**
   *
   */
  reset() {
    this.form.reset();
  }
}
