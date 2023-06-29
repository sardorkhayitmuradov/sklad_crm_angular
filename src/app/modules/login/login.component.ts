import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginRequest, LoginResponse } from './model/login.model';
import { Auth } from '../shared/crud/auth.class';
import { LoginService } from './service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends Auth<LoginResponse, LoginRequest> {
  // Forms
  form = this.fb.group({
    phone_number: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  passwordVisible = false;
  password?: string;

  constructor(
    private fb: FormBuilder,
    $data: LoginService,
    $notification: NzNotificationService,
    router: Router,
    route: ActivatedRoute
  ) {
    super($data, $notification, router, route);
  }

  // Options Role
  optionList = [
    { label: 'Admin', value: 'employer' },
    { label: 'Xodim', value: 'employee' },
  ];
  selectedValue = this.optionList[1];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compareFn = (o1: { label: string; value: string }, o2: { label: string; value: string }): boolean =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;

  log(event: { label: string; value: string }) {
    this.selectedValue = event;
    this.$data.url = this.selectedValue.value;
  }
}
