import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder
} from '@angular/forms';
import { SuperAdminLoginService } from './service/superAdminLogin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../shared/crud/auth.class';
import { SuperAdminLoginRequest, SuperAdminLoginResponse } from './model/superAdminLogin.model';

@Component({
  selector: 'superAdminLogin',
  templateUrl: './superAdminLogin.component.html',
  styleUrls: ['./superAdminLogin.component.css'],
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
    route: ActivatedRoute
  ) {
    super($data, $notification, router, route);
  }
}
