import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Phone_Number_Formatter } from '../../directives/phone_number_formatter.directive';

export abstract class Auth<TResponse, TRequest> {
  /**
   *
   */
  protected phone_number?: string
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
  ) {
    
  }

  /* 
  * 
  */
  formatter(phoneNumber: string){
    this.phone_number = phoneNumber.replace(/^(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1-$2-$3-$4-$5');
  }


  /**
   *
   * @param request
   */
  login() {
    const request: TRequest = this.form.getRawValue();
    const countryCode = '+998';
    this.formatter(countryCode+this.form.value.phone_number)
    this.form.value.phone_number = this.phone_number
    console.log(this.phone_number, this.form.value)

    if (this.form.valid) {
      this.$data.login(request).subscribe((item) => {
        // if (item) {
        //   this.router.navigate([route], { relativeTo: this.route });
        //   return;
        // }
        console.log(item);
      });
    } else {
      // this.createNotification('error', 'error')
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

  createNotification(type: string, error: any): void {
    this.$notification.create(type, error, error, {
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
