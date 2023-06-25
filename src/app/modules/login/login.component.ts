import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Forms
  validateForm!: FormGroup;

  passwordVisible = false;
  password?: string;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
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
    private $notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      phone_number: ['+998 (', [Validators.required]],
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
  createNotification(type: string): void {
    this.$notification.create(
      type,
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      { nzPlacement: 'top', nzDuration: 3000 }
    );
  }
}
