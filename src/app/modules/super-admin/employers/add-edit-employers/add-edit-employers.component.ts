import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployersService } from '../services/employers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEdit } from 'src/app/modules/shared/crud/add-edit.class';
import { EmployersRequest, EmployersResponse } from '../models/employers.model';

@Component({
  selector: 'add-edit-employers',
  templateUrl: './add-edit-employers.component..html',
})
export class AddEditEmployersComponent extends AddEdit<
  EmployersResponse,
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
    router: Router,
    route: ActivatedRoute
  ) {
    super($data, router, route);
  }
}
