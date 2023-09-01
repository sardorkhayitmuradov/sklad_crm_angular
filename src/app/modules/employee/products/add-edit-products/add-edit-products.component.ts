import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddEdit } from 'src/app/modules/shared/crud/add-edit.class';
import { Products, ProductsRequest } from '../models/products.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.css']
})
export class AddEditProductsComponent  extends AddEdit<Products, ProductsRequest> {
   /**
   *
   */
   form = this.fb.nonNullable.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    qty: ['', Validators.required],
    price: ['', Validators.required],
    unit: ['', Validators.required],
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
    $data: ProductsService,
    $notification: NzNotificationService,
    router: Router,
    route: ActivatedRoute,
  ) {
    super($data,$notification, router, route);
    if (this.isEdit) {
      route.data.subscribe((w) => {
        this.setFormValues(w['data']['data']);
      });
    }
  }

  protected override getById(): void {
      // Nothing
  }

  /**
   * "dona", "kg", "qadoq", "qadoq"
   */
  UNITS = [
    {
      value: 'dona',
      label: 'dona',
    },
    {
      value: 'kg',
      label: 'kg',
    },
    {
      value: 'm2',
      label: 'm2',
    },
    {
      value: 'qadoq',
      label: 'qadoq',
    },
  ];


  /**
   *
   */
  goBack() {
    this.router.navigate([this.isEdit ? '../../' : '../'], {
      relativeTo: this.route,
    });
  }
};
