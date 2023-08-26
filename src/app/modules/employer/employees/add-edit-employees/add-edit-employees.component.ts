import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddEdit } from 'src/app/modules/shared/crud/add-edit.class';
import { Employees, EmployeesRequest } from '../model/employees.model';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { formatter } from 'src/app/modules/login/login.component';

@Component({
  selector: 'add-edit-employees',
  templateUrl: './add-edit-employees.component.html',
  styleUrls: ['./add-edit-employees.component.css'],
})
export class AddEditEmployeesComponent extends AddEdit<
  Employees,
  EmployeesRequest
> {

  private $id!: string;
  public override get id(): string {
    return this.$id
  }

  public override set id(v: string){
    this.$id = v;
  }

  /**
   *
   */
  form = this.fb.nonNullable.group({
    fullname: ['', [Validators.required, minLength(3)]],
    phone_number: ['', Validators.required],
    password: ['', [Validators.required, minLength(8)]],
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
    super($data, $notification, router, route);
    if (this.isEdit) {
      route.data.subscribe((w) => {
        this.setFormValues(w['data']['data']);
        this.form.controls.phone_number.setValue(
          this.form.controls.phone_number.value.replace('+998', '')
        );
      });
      this.form.controls.password.disable();
    }
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

  /**
   *
   * @returns
   */
  override submit(): void {
    if (this.form.invalid) {
      this.updateValueAndValidity();
      return;
    }

    if (this.isEdit) {
      const request: EmployeesRequest = this.getRequest();
      const { password, ...rest } = request;

      this.edit(rest as any);
      return;
    }

    this.add(this.getRequest());
  }

  /**
   *
   */
  goBack() {
    this.router.navigate([this.isEdit ? '../../' : '../'], {
      relativeTo: this.route,
    });
  }
}

export function minLength(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined) {
      return null; // If value is null or undefined, consider it valid
    }

    return value.length >= minLength
      ? null
      : { minlength: { value: control.value, requiredLength: minLength } };
  };
}
