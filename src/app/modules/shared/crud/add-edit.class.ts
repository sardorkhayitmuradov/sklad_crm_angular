import {  FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CRUDService } from '../services/crud.service';

export abstract class AddEdit<TResponse, TRequest> {
  /**
   *
   */
  abstract form: FormGroup;

  /**
   *
   */
  get isEdit() {
    return this.id > 0;
  }

  /**
   *
   */
  get id() {
    return Number(this.route.snapshot.params['id']);
  }

  /**
   *
   * @param $teachers
   */
  constructor(
    private $data: CRUDService<TResponse, TRequest>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.isEdit) {
      $data.getById(this.id).subscribe((item) => {
        this.setFormValues(item);
      });
    }
  }

  /**
   *
   * @param model
   */
  private setFormValues(model: TResponse) {
    type FormControlsKeys = keyof typeof this.form.controls;
    type TResponseKeys = keyof TResponse;
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key as FormControlsKeys].setValue(
        model[key as TResponseKeys]
      );
    });
  }

  /**
   *
   * @returns
   */
  submit() {
    if (this.form.invalid) {
      this.updateValueAndValidity();
      return;
    }

    const request: TRequest = this.form.getRawValue();
    if (this.isEdit) {
      this.edit(request);
      return;
    }

    this.add(request);
  }

  /**
   *
   * @param request
   */
  private add(request: TRequest) {
    this.$data.add(request).subscribe((item) => {
      if (item) {
        // this.router.navigate(['../'], { relativeTo: this.route });
        return;
      }
    });
  }

  /**
   *
   * @param request
   */
  private edit(request: TRequest) {
    this.$data.edit(this.id, request).subscribe((item) => {
      if (item) {
        // this.router.navigate(['../../'], { relativeTo: this.route });
        return;
      }
    });
  }

  /**
   *
   */
  private updateValueAndValidity() {
    Object.values(this.form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  /**
   *
   */
  reset() {
    this.form.reset();
  }
}
