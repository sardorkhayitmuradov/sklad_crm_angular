import { Component } from '@angular/core';
import { AddEdit } from 'src/app/modules/shared/crud/add-edit.class';
import { Markets, MarketsRequest } from '../models/markets.models';
import { FormBuilder, Validators } from '@angular/forms';
import { MarketsService } from '../services/markets.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { formatter } from 'src/app/modules/shared/crud/auth.class';

@Component({
  selector: 'app-add-edit-markets',
  templateUrl: './add-edit-markets.component.html',
  styleUrls: ['./add-edit-markets.component.css']
})
export class AddEditMarketsComponent extends AddEdit<Markets, MarketsRequest>  {
   /**
   *
   */
   form = this.fb.nonNullable.group({
    market_name: ['', Validators.required],
    phone_number: ['', Validators.required],
    location: ['', Validators.required],
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
    $data: MarketsService,
    $notification: NzNotificationService,
    router: Router,
    route: ActivatedRoute,
  ) {
    super($data,$notification, router, route);
    if (this.isEdit) {
      route.data.subscribe((w) => {
        console.log(w)
        this.setFormValues(w['data']);
      });
    }
  }


  /**
   *
   * @returns
   */
  protected override getRequest(): MarketsRequest {
    const request = super.getRequest();
    const countryCode = '+998';
    request.phone_number = formatter(countryCode + request.phone_number);
    console.log(request);
    return request;
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
