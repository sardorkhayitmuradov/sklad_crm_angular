import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { Role } from '../shared/models/role.model';
import { Token } from '../shared/models/token.model';
import { TOKEN } from 'src/app/core/auth.inteceptor';
import jwt_decode from 'jwt-decode';
import { TranslateService } from '@ngx-translate/core';
import {
  DEFAULT_LANGUAGE,
  getCurrentLangauge,
} from '../components/language/language.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  passwordVisible = false;
  isLogin: boolean = false;
  tokenInfo?: Token;

  /**
   *
   */
  optionList = [
    { label: 'employer', value: 'employer' },
    { label: 'employee', value: 'employee' },
  ];

  /**
   *
   */
  selectedValue = this.optionList[1];

  /**
   *
   */
  form = this.fb.nonNullable.group({
    phone_number: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.min(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private $auth: LoginService,
    private $notification: NzNotificationService,
    private router: Router,
    private $translate: TranslateService
  ) {
    $translate.onLangChange.subscribe((w) => {
      setTimeout(() => {
        this.translateFn = (key) => this.$translate.instant(key);
      });
    });
    $translate.setDefaultLang(DEFAULT_LANGUAGE);
    $translate.use(getCurrentLangauge());
  }

  /**
   *
   * @param key
   * @returns
   */
  translateFn = (key: string) => this.$translate.instant(key);

  /**
   *
   * @param o1
   * @param o2
   * @returns
   */
  compareFn = (o1: Role, o2: Role) =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;

  /**
   *
   * @param event
   */
  log(event: Role) {
    this.selectedValue = event;
  }

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
  login(route: string) {
    this.isLogin = true;

    if (this.form.valid) {
      const request = this.form.getRawValue();
      if (request?.phone_number) {
        const countryCode = '+998';
        request.phone_number = formatter(countryCode + request.phone_number);
      }

      this.$auth.login(route, request).subscribe({
        next: (response) => {
          if (response.token) {
            this.isLogin = false;
            localStorage.setItem(TOKEN, response.token);
            const token = localStorage.getItem(TOKEN)!;
            this.tokenInfo = this.getDecodedAccessToken(token) as Token;
            this.router.navigate([`/${route}`]);
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
   * @param type
   * @param error
   */
  createNotification(type: string, error: any) {
    this.$notification.create(type, error, '', {
      nzPlacement: 'top',
      nzDuration: 0,
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

  /**
   *
   */
  reset() {
    this.form.reset();
  }
}

/**
 *
 * @param phoneNumber
 * @returns
 */
export function formatter(phoneNumber: string) {
  let phone_number: string = phoneNumber.replace(
    /^(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/,
    '$1-$2-$3-$4-$5'
  );
  return phone_number;
}

// login(route: string) {
//   if (this.form.valid) {
//     this.isLogin = true;
//     const request = this.form.getRawValue();
//     if (request?.phone_number) {
//       const countryCode = '+998';
//       request.phone_number = formatter(countryCode + request.phone_number);
//     }

//   this.$auth.login(route, request).subscribe({
//     next: (response) => {
//       if (response.token) {
//         this.isLogin = false;
//         localStorage.setItem(TOKEN, response.token);
//         const token = localStorage.getItem(TOKEN)!;
//         this.tokenInfo = this.getDecodedAccessToken(token) as Token;
//         this.router.navigate([`/${route}`]);
//       }
//     },
//     error: (response) => {
//       this.isLogin = false;
//       this.createNotification('error', response.error.error);
//     },
//   });

//     this.$auth.login(route, request).subscribe((w) => {
//       this.isLogin = false;
//       localStorage.setItem(TOKEN, w.token);
//       const token = localStorage.getItem(TOKEN)!;
//       this.tokenInfo = this.getDecodedAccessToken(token) as Token;
//       this.router.navigate([`/${route}`]);
//     });

//   } else {
//     this.isLogin = false;
//     Object.values(this.form.controls).forEach((control) => {
//       if (control.invalid) {
//         control.markAsDirty();
//         control.updateValueAndValidity({ onlySelf: true });
//       }
//     });

//     return this.updateValueAndValidity();
//   }
// }

// /**
//  *
//  * @param request
//  */
// login(route: string) {
//   this.isLogin = true;

//   if (this.form.valid) {
//     const request = this.form.getRawValue();
//     if (request?.phone_number) {
//       const countryCode = '+998';
//       request.phone_number = formatter(countryCode + request.phone_number);
//     }

//     this.$auth.login(route, request).subscribe({
//       next: (response) => {
//         if (response.token) {
//           this.isLogin = false;
//           localStorage.setItem(TOKEN, response.token);
//           const token = localStorage.getItem(TOKEN)!;
//           this.tokenInfo = this.getDecodedAccessToken(token) as Token;
//           this.router.navigate([`/${route}`]);
//         }
//       },
//       error: (response) => {
//         this.isLogin = false;
//         this.createNotification('error', response.error.error);
//       },
//     });
//   } else {
//     this.isLogin = false;
//     return this.updateValueAndValidity();
//   }
// }
