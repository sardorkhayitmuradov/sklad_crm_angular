import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CRUDService } from '../services/crud.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export abstract class AddEdit<TResponse, TRequest> {
  /**
   *
   */
  abstract form: FormGroup;

  /**
   *
   */
  get isEdit() {
    return this.id;
  }

  /**
   *
   */
  private _id!: string;
  public get id(): string {
    return this._id;
  }
  public set id(v: string) {
    this._id = v;
    if (this.isEdit) {
      this.getById();
    }
  }


  /**
   *
   * @param $teachers
   */
  constructor(
    protected $data: CRUDService<TResponse, TRequest>,
    private $notification: NzNotificationService,
    protected router: Router,
    protected route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'] as string;
  }

  /**
   *
   */
  protected getById() {
    this.$data.getById(this.id).subscribe((item) => {
      this.setFormValues(item.data);
    });
  }


  /**
   *
   * @param model
   */
  protected setFormValues(model: TResponse[]) {
    type FormControlsKeys = keyof typeof this.form.controls;
    type TResponseKeys = keyof TResponse[];
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
    
    const request: TRequest = this.getRequest();
    if (this.isEdit) {
      this.edit(request);
      return;
    }
    
    this.add(request);

  }

  /**
   *
   * @returns
   */
  protected getRequest(): TRequest {
    return this.form.getRawValue();
  }

  /**
   *
   * @param request
   */
  protected add(request: TRequest) {
    this.$data.add(request).subscribe({
      next: (response) => {
        if (response) {
          this.afterSuccess();
          return;
        }
      },
      error: (response) => {
        let err = response.error.error;
        if (err) {
          this.createNotification('error', err);
        }
      },
    });
  }

  /**
   *
   */
  protected afterSuccess() {
    if (this.isEdit) {
      this.router.navigate(['../../'], { relativeTo: this.route });
      return;
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  /**
   *
   * @param request
   */
  private edit(request: TRequest) {
    this.$data.edit(this.id, request).subscribe((item) => {
      if (item) {
        this.afterSuccess();
        return;
      }
    });
  }

  /**
   *
   */
  protected updateValueAndValidity() {
    Object.values(this.form.controls).forEach((control) => {
      if (control instanceof FormArray) {
        control.controls.forEach((formGroup) => {
          Object.values((formGroup as FormGroup).controls).forEach(
            (innerControl) => {
              this.markAsDirty(innerControl);
            }
          );
        });
        return;
      }

      if (control.invalid) {
        this.markAsDirty(control);
      }

    });
  }

  createNotification(type: string, error: any) {
    this.$notification.create(type, error, '', {
      nzPlacement: 'top',
      nzDuration: 1000,
    });
  }

   /**
   *
   * @param control
   */
   protected markAsDirty(control: AbstractControl) {
    control.markAsDirty();
    control.updateValueAndValidity({ onlySelf: true });
  }

  /**
   *
   */
  reset() {
    this.form.reset();
  }
}
