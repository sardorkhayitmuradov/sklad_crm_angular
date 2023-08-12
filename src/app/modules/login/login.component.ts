import { Component } from '@angular/core';
import { role } from './model/role.model';
import { Validators, FormBuilder } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginRequest, LoginResponse } from './model/login.model';
import { Auth } from '../shared/crud/auth.class';
import { LoginService } from './service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(
    private fb: FormBuilder,
    $data: LoginService,
    $notification: NzNotificationService,
    cookieService: CookieService,
    router: Router,
    route: ActivatedRoute
  ) {
    super($data, $notification, cookieService, router, route);
  }

  // Options Role
  optionList = [
    { label: 'Admin', value: 'employer' },
    { label: 'Xodim', value: 'employee' },
  ];
  selectedValue = this.optionList[1];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compareFn = (o1: role, o2: role) => o1 && o2 ? o1.value === o2.value : o1 === o2;

  log(event: role) {
    this.selectedValue = event;
    this.$data.url = this.selectedValue.value;
  }
}
