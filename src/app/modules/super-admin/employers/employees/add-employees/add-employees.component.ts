import { Component } from '@angular/core';
import { AddEdit } from 'src/app/modules/shared/crud/add-edit.class';
import { Employees, EmployeesRequest } from '../models/employees.model';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { formatter } from 'src/app/modules/login/login.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html'
})
export class AddEmployeesComponent extends AddEdit<
  Employees,
  EmployeesRequest
> {
  private employer_id = this.cookieService.get('employer_id') || "";
  /**
   *
   */
   form = this.fb.nonNullable.group({
    fullname: ['', Validators.required],
    password: ['', Validators.required],
    phone_number: ['', Validators.required],
    employerId: [this.employer_id, Validators.required]
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
    private cookieService: CookieService,
    router: Router,
    route: ActivatedRoute,
  ) {
    super($data,$notification, router, route);
  }

   /**
   * 
   * @returns 
   */
   protected override getRequest(): EmployeesRequest {
    const request = super.getRequest();
    const countryCode = '+998';
    request.phone_number = formatter(countryCode + request.phone_number);
    return request;
  }

}
