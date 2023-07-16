import { FormGroup } from '@angular/forms';
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
    return this.id ;
  }

  /**
   *
   */
  get id() {
    return this.route.snapshot.params['id']; // id is string
  }

  /**
   *
   * @param $teachers
   */
  constructor(
    private $data: CRUDService<TResponse, TRequest>,
    private $notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.isEdit) {
      $data.getById(this.id).subscribe((item) => {
        this.setFormValues(item.data);
      });
    }
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
  submit(key: string) {
    if (this.form.invalid) {
      this.updateValueAndValidity();
      return;
    }

    const request: TRequest = this.getRequest();
    if (key === 'Edit') {
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
  private add(request: TRequest) {
    console.log(request)
    this.$data.add(request).subscribe({
      next: (response) => { 
          if (response) {
            this.router.navigate(['../'], { relativeTo: this.route });
            return;
          }
      },
      error: (response) => { 
        let err = response.error.error
        if(err){
          this.createNotification('error', err);
        }
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
        this.router.navigate(['../../'], { relativeTo: this.route });
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

  createNotification(type: string, error: any) {
    this.$notification.create(type, error, '', {
      nzPlacement: 'top',
      nzDuration: 1000
    });
  }

  /**
   *
   */
  reset() {
    this.form.reset();
  }
}
