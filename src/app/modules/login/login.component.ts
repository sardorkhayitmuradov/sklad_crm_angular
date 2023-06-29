import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Grid } from '../shared/crud/grid.class';
import { LoginRequest, LoginResponse } from './model/login.model';
import { LoginService } from './service/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent
  extends Grid<LoginResponse, LoginRequest>
  implements OnInit
{
  // Forms
  validateForm!: FormGroup;

  passwordVisible = false;
  password?: string;

  formatPhoneNumber(phone: string) {
    return (
      '+998-' +
      phone.slice(0, 2) +
      '-' +
      phone.slice(2, 5) +
      '-' +
      phone.slice(5)
    );
  }

  submitForm() {
    if (this.validateForm.valid) {
        this.data$.subscribe((item) => {
          const phoneNumber = this.validateForm.value.phone_number;
          const formattedPhoneNumber = this.formatPhoneNumber(phoneNumber);
          // now use `formattedPhoneNumber` for your purposes
          console.log('submit', {
            ...this.validateForm.value,
            phone_number: formattedPhoneNumber,
          });
        })
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private $notification: NzNotificationService,
    $data: LoginService
  ) {
    super($data);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      phone_number: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
    });
  }

  // Options Role
  optionList = [
    { label: 'Admin', value: 'employer' },
    { label: 'Xodim', value: 'employee' },
  ];
  selectedValue = this.optionList[1];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compareFn = (o1: any, o2: any): boolean =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;

  log(event: any) {
    console.log(event);
  }

  // Notification
  createNotification(type: string) {
    this.$notification.create(
      type,
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      { nzPlacement: 'top', nzDuration: 3000 }
    );
  }
}
