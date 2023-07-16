import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder
} from '@angular/forms';
import { SuperAdminLoginService } from './service/super-admin-login.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../shared/crud/auth.class';
import { SuperAdminLoginRequest, SuperAdminLoginResponse } from './model/super-admin-login.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'superAdminLogin',
  templateUrl: './super-admin-login.component.html',
  styleUrls: ['./super-admin-login.component.css'],
})
export class SuperAdminLoginComponent extends Auth<SuperAdminLoginResponse, SuperAdminLoginRequest> {
  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    $data: SuperAdminLoginService,
    $notification: NzNotificationService,
    router: Router,
    route: ActivatedRoute,
    cookieService: CookieService
  ) {
    super($data, $notification, cookieService, router, route);
  }
}
