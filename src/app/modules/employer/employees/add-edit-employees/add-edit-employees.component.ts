import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddEdit } from 'src/app/modules/shared/crud/add-edit.class';
import { Employees, EmployeesRequest } from '../model/employees.model';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { formatter } from 'src/app/modules/shared/crud/auth.class';

@Component({
  selector: 'add-edit-employees',
  templateUrl: './add-edit-employees.component.html',
  styleUrls: ['./add-edit-employees.component.css']
})
export class AddEditEmployeesComponent extends AddEdit<Employees, EmployeesRequest> {

  /**
   *
   */
  @Input()
  isVisible = false;

  /**
   *
   */
  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  /**
   *
   */
  @Output()
  submitted = new EventEmitter<boolean>();


    /**
   *
   */
  form = this.fb.nonNullable.group({
    fullname: ['', Validators.required],
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
    route: ActivatedRoute,
  ) {
    super($data,$notification, router, route);
    if (this.isEdit) {
      route.data.subscribe((w) => {
        this.setFormValues(w['data']);
      });
    }
  }

   /**
   *
   */
   protected override afterSuccess(): void {
    this.submitted.emit(true);
    this.close();
  }


  /**
   *
   * @returns
   */
  canDeactivate = () => {
    return confirm('Sizda saqlanmagan malumotlar bor. Rostan chiqmoqchimisiz?');
  };

  /**
   *
   * @returns
   */
  protected override getRequest(): EmployeesRequest {
    const request = super.getRequest();
    const countryCode = '+998';
    request.phone_number = formatter(countryCode + request.phone_number);
    console.log(request);
    return request;
  }

  /**
   *
   */
  cancel() {
    this.close();
  }

  /**
   *
   */
  close() {
    this.isVisibleChange.emit(false);
  }

}
