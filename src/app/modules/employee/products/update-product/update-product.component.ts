import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Products, ProductsRequest } from '../models/products.model';
import { AddEdit } from 'src/app/modules/shared/crud/add-edit.class';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'employee-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent extends AddEdit<Products, ProductsRequest> {

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
    code: ['', Validators.required],
    name: ['', Validators.required],
    qty: ['', Validators.required],
    price: ['', Validators.required],
    unit: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    $data: ProductsService,
    $notification: NzNotificationService,
    router: Router,
    route: ActivatedRoute
  ) {
    super($data, $notification, router, route);
    this.getProduct()
  }

  getProduct(){
    if (this.id) {
      this.$data.getById(this.id).subscribe((item) => {
        this.setFormValues(item.data);
      });
    }
  }

  /**
   *
   */
  protected override afterSuccess() {
    this.submitted.emit(true);
    this.close();
  }

  /**
   *
   */
  canDeactivate = () => {
    return confirm('Sizda saqlanmagan malumotlar bor. Rostan chiqmoqchimisiz?');
  };

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
    this.form.reset();
    this.id = '';
  }
}
