import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployersService } from '../services/employers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEdit } from 'src/app/modules/shared/crud/add-edit.class';
import { EmployersRequest, Employers } from '../models/employers.model';
import { formatter } from 'src/app/modules/login/login.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'add-employers',
  templateUrl: './add-employers.component.html',
})
export class AddEmployersComponent extends AddEdit<
  Employers,
  EmployersRequest
> {
  /**
   *
   */
  form = this.fb.nonNullable.group({
    fullname: ['', Validators.required],
    password: ['', Validators.required],
    phone_number: ['', Validators.required],
  });

  /**
   *
   * @param fb
   * @param $data
   * @param router
   * @param route
   */
  constructor(
    private fb: FormBuilder,
    $data: EmployersService,
    $notification: NzNotificationService,
    router: Router,
    route: ActivatedRoute
  ) {
    super($data, $notification, router, route);
  }

  /**
   *
   * @returns
   */
  protected override getRequest(): EmployersRequest {
    const request = super.getRequest();
    const countryCode = '+998';
    request.phone_number = formatter(countryCode + request.phone_number);
    return request;
  }
}
