import { Component } from '@angular/core';
import { AddEdit } from 'src/app/modules/shared/crud/add-edit.class';
import { Employees, EmployeesRequest } from '../models/employees.model';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { formatter } from 'src/app/modules/login/login.component';

@Component({
  selector: 'app-edit-employees',
  templateUrl: './edit-employees.component.html'
})
export class EditEmployeesComponent extends AddEdit<
  Employees,
  EmployeesRequest
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
    $data: EmployeesService,
    $notification: NzNotificationService,
    router: Router,
    route: ActivatedRoute
  ) {
    super($data,$notification, router, route);
    if (this.isEdit) {
      route.data.subscribe((w) => {
        this.setFormValues(w['data']);
      })
    }
  }

   /**
   * 
   * @returns 
   */
   protected override getRequest(): EmployeesRequest {
    const request = super.getRequest();
    const countryCode = '+998'
    request.phone_number = formatter(countryCode + request.phone_number)
    return request;
  }
}
