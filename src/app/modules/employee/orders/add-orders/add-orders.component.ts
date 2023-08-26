import { Component } from '@angular/core';
import { AddEdit } from 'src/app/modules/shared/crud/add-edit.class';
import { OrdersRequest, OrdersResponse } from '../model/orders.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { Markets } from '../../markets/models/markets.models';
import { Products } from '../../products/models/products.model';
import { AddOrdersService } from './services/add-orders.service';
import { Tab } from './model/tab.model';

@Component({
  selector: 'employee-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css'],
})
export class AddOrdersComponent extends AddEdit<OrdersResponse, OrdersRequest> {
  /**
   *
   */
  tab: Tab[] = [
    { tab: 'Market', id: 0 },
    { tab: 'Client', id: 1 },
  ];

  selectedTab = this.tab[0];

  /**
   *
   */
  form = this.fb.nonNullable.group({
    client_type: ['', Validators.required],
    client_name: [''],
    market_id: [''],
    products: this.fb.array([
      this.fb.group({
        productId: ['', Validators.required],
        qty: [0, [Validators.required, Validators.min(1)]],
        price: [0, Validators.required],
        overallPrice: [{ value: 0, disabled: true }],
      }),
    ]),
    paid: [0, Validators.required],
  });

  /**
   *
   * @param index
   */
  handleTabChange(index: number) {
    for (let i = 0; i < this.tab.length; i++) {
      if (index === this.tab[i].id) {
        this.selectedTab = this.tab[i];
        this.form.controls.client_type.setValue(this.selectedTab.tab);
        if (this.selectedTab.tab === 'Market') {
          this.form.controls.market_id.setValidators([Validators.required]);
          this.form.controls.client_name.clearValidators();
        }

        if (this.selectedTab.tab === 'Client') {
          this.form.controls.client_name.setValidators([
            Validators.required,
            Validators.minLength(4),
          ]);
          this.form.controls.market_id.clearValidators();
        }

        // Update the validation status
        this.form.controls.client_name.updateValueAndValidity();
        this.form.controls.market_id.updateValueAndValidity();
      }
    }

    this.form.controls.client_name.setValue('');
    this.form.controls.market_id.setValue('');
  }

  /**
   *
   */
  markets: Markets[] = [];

  /**
   *
   */
  productsData: Products[] = [];

  /**
   *
   */
  orderTotalPrice: number = 0;

  /**
   *
   * @param fb
   * @param $data
   * @param router
   * @param route
   */
  constructor(
    private fb: FormBuilder,
    $data: AddOrdersService,
    $notification: NzNotificationService,
    router: Router,
    route: ActivatedRoute
  ) {
    super($data, $notification, router, route);
    $data.getMarkets().subscribe((w: any) => {
      this.markets = w['data'];
    });

    $data.getProducts().subscribe((w: any) => {
      this.productsData = w['data'];
    });

    this.form.controls.client_type.setValue(this.selectedTab.tab);
    this.form.controls.market_id.setValidators([Validators.required]);
  }

  /**
   *
   * @returns
   */
  get products() {
    return this.form.controls.products as FormArray;
  }

  /**
   *
   */
  showOrderTotalPrice() {
    const products = this.products.getRawValue();
    this.orderTotalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      this.orderTotalPrice += products[i].overallPrice;
    }
  }

  /**
   *
   * @param index
   * @param productId
   * @param fromProductSelect
   */
  setProductQty(index: number, productId: string, fromProductSelect = false) {
    const selectedProduct = this.productsData.find((product) => product._id === productId);
    const productGroup = this.products.at(index) as FormGroup;

    if (selectedProduct) {
      const qtyControl = productGroup.get('qty');
      const overrallPriceControl = productGroup.get('overallPrice');
      const priceControl = productGroup.get('price');


      if (qtyControl && overrallPriceControl && priceControl) {
        if (fromProductSelect) {
          qtyControl.setValue(1);
          priceControl.setValue(selectedProduct.price);
          overrallPriceControl.setValue(qtyControl.value * selectedProduct.price);

          if (this.products.getRawValue().length === 1) {
            this.orderTotalPrice = selectedProduct.price;
          }
          if (this.products.getRawValue().length > 1) {
            this.showOrderTotalPrice();
          }
          this.form.controls.paid.setValue(this.orderTotalPrice);
        }

        if (!isNaN(qtyControl.value) && !isNaN(selectedProduct.price)) {
          const overallPrice = qtyControl.value * priceControl.value;
          overrallPriceControl.setValue(overallPrice);
          this.showOrderTotalPrice();
          this.form.controls.paid.setValue(this.orderTotalPrice);
        }
      }
    }
  }

  /**
   *
   * @param index
   * @param priceValue
   */
  updateOverallPrice(index: number, price: any) {
    const productGroup = this.products.at(index);

    if (productGroup instanceof FormGroup) {
      const qtyControl = productGroup.get('qty');
      const overallPriceControl = productGroup.get('overallPrice');

      if (qtyControl && overallPriceControl) {
        if (!isNaN(qtyControl.value)) {
          const overallPrice = Number(qtyControl.value) * price;
          overallPriceControl.setValue(overallPrice);
          this.showOrderTotalPrice();
          this.form.controls.paid.setValue(this.orderTotalPrice);
        }
      }
    }
  }

  /**
   *
   * @param productId
   * @returns
   */
  getProductUnit(productId?: string) {
    const selectedProduct = this.productsData.find((p) => p._id === productId)!;
    if (selectedProduct) {
      return selectedProduct.unit;
    }

    return '';
  }

  /**
   *
   */
  addProduct() {
    this.products.push(
      this.fb.group({
        productId: ['', Validators.required],
        qty: [0, Validators.required],
        price: [0, Validators.required],
        overallPrice: [{ value: 0, disabled: true }, Validators.required],
      })
    );
  }


  /**
   *
   */
  override submit(): void {
    if (this.form.invalid) {
      this.updateValueAndValidity();
      return;
    }

    const request: OrdersRequest = this.form.getRawValue() as any;
    // Creating a new array with productPrice removed from each product
    const modifiedProducts = request.products.map((product) => {
      const { overallPrice, ...rest } = product;
      return rest;
    });

    // Creating a new object with the modified products array
    const modifiedRequest = { ...request, products: modifiedProducts };
    this.add(modifiedRequest as any);
  }

  /**
   *
   */
  goBack() {
    this.router.navigate([this.isEdit ? '../../' : '../'], {
      relativeTo: this.route,
    });
  }

  /**
   *
   * @param answerIndex
   */
  removeProduct(index: number) {
    this.products.removeAt(index);
  }
}

// // FORM SET VALUES
// /**
//  *
//  * @param model
//  */
// protected override setFormValues(model: any) {
//   this.form.controls.client_name.setValue(model.client_type);
//   this.form.controls.client_type.setValue(model.client_type);
//   this.form.controls.market_id.setValue(model.market_id);
//   this.form.controls.paid.setValue(model.paid);

//   this.form.controls.products.controls.pop();
//   for (let index = 0; index < model.products.length; index++) {
//     const product = model.products[index];
//     this.form.controls.products.push(
//       this.fb.group({
//         productId: [product._id, Validators.required],
//         qty: [product.qty, Validators.required],
//         price: [product.qty, Validators.required],
//       })
//     );
//   }
// }
