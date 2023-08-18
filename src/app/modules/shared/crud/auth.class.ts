import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginResponse } from '../../login/model/login.model';
import { CookieService } from 'ngx-cookie-service';
import { RoleModel } from '../models/role.model';
import  jwt_decode from 'jwt-decode';


export abstract class Auth<TResponse extends LoginResponse, TRequest> {

  abstract form: FormGroup;
  protected isLogin: boolean = false;
  tokenInfo?: RoleModel;

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
  
  private getDecodedAccessToken(token: string) {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  
  /**
   *
   * @param request
  */
 login(route: string) {
   this.isLogin = true;
   const request = this.form.getRawValue();
   if(request?.phone_number){
     const countryCode = '+998';
     request.phone_number = formatter(countryCode + request.phone_number);
    } 
    
    if (this.form.valid) {
      this.$data.login(request).subscribe({
        next: (response) => {
          if (response.token) {
            this.isLogin = false;
            this.cookieService.delete("token");
            this.cookieService.set('token', response.token);
            const token = this.cookieService.get('token');
            this.tokenInfo = this.getDecodedAccessToken(token) as RoleModel
            // console.log('route: ', route , 'token.role : ', this.tokenInfo.role);
            if(this.tokenInfo.role === route){
              this.router.navigate([route]);
            } else {
              this.createNotification('error', 'User is not existed!');
            }
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
