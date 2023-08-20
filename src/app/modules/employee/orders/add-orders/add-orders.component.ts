import { Component } from '@angular/core';
import { AddEdit } from 'src/app/modules/shared/crud/add-edit.class';
import { OrdersRequest, OrdersResponse } from '../model/orders.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { Markets } from '../../markets/models/markets.models';
import { Products } from '../../products/models/products.model';
import { AddOrdersService } from './services/add-orders.service';

export interface Tab {
  id: number;
  tab: string;
}

@Component({
  selector: 'employee-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css'],
})
export class AddOrdersComponent extends AddEdit<OrdersResponse, OrdersRequest> {
  /**
   *
   */
  form = this.fb.nonNullable.group({
    client_type: ['', Validators.required],
    client_name: ['', Validators.required],
    market_id: ['', Validators.required],
    products: this.fb.array([
      this.fb.group({
        productId: ['', Validators.required],
        qty: [0, [Validators.required, Validators.min(1)]],
        productPrice: [0, Validators.required],
        price: [{ value: 0, disabled: true }, Validators.required],
      }),
    ]),
    paid: [0, Validators.required],
  });

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
   * @param index
   */
  handleTabChange(index: number) {
    for (let i = 0; i < this.tab.length; i++) {
      if (index === this.tab[i].id) {
        this.selectedTab = this.tab[i];
        this.form.controls.client_type.setValue(this.selectedTab.tab);
      }
    }

    this.form.controls.client_name.setValue('');
    this.form.controls.market_id.setValue('');
    // this.form.reset
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
  }

  /**
   *
   * @returns
   */
  get products() {
    return this.form.controls.products as FormArray;
  }

  showOrderTotalPrice() {
    const products = this.products.getRawValue();
    this.orderTotalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      this.orderTotalPrice += products[i].price;
    }
  }

  setProductQty(index: number, productId: string, fromProductSelect = false) {
    const selectedProduct = this.productsData.find((p) => p._id === productId)!;
    const productGroup = this.products.at(index);

    if (productGroup instanceof FormGroup) {
      const qtyControl = productGroup.get('qty')!;
      const priceControl = productGroup.get('price')!;
      const productPriceControl = productGroup.get('productPrice')!;

      if (qtyControl && priceControl && productPriceControl) {
        // let qty = qtyControl.value;
        // const price = priceControl.value;
        // const productPrice = productPriceControl.value;

        // Handle initial qty value and price calculation
        if (fromProductSelect) {
          qtyControl.setValue(1); // Update the form control value

          // Multiply the price by the initial qty
          productPriceControl.setValue(selectedProduct.price);
          priceControl.setValue(qtyControl.value * selectedProduct.price);
          if (this.products.getRawValue().length === 1) {
            this.orderTotalPrice = selectedProduct.price;
          }
          if (this.products.getRawValue().length > 1) {
            this.showOrderTotalPrice();
          }
          this.form.controls.paid.setValue(this.orderTotalPrice);
        }

        if (!isNaN(qtyControl.value) && !isNaN(priceControl.value)) {
          const overallPrice = qtyControl.value * productPriceControl.value;
          priceControl.setValue(overallPrice);
          this.showOrderTotalPrice();
          this.form.controls.paid.setValue(this.orderTotalPrice);
        }
      }
    }
  }

  updateOverallPrice(index: number, priceValue: any) {
    const price = priceValue;
    const productGroup = this.products.at(index);

    if (productGroup instanceof FormGroup) {
      const qtyControl = productGroup.get('qty');
      const priceControl = productGroup.get('price');

      if (qtyControl && priceControl) {
        let qty = qtyControl.value;

        if (!isNaN(qty)) {
          const overallPrice = Number(qty) * price;
          priceControl.setValue(overallPrice);
          this.showOrderTotalPrice();
          this.form.controls.paid.setValue(this.orderTotalPrice);
        }
      }
    }
  }

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
        productPrice: [0, Validators.required],
        price: [{ value: 0, disabled: true }, Validators.required],
      })
    );
  }

  /**
   *
   * @param answerIndex
   */
  removeProduct(index: number) {
    this.products.controls.splice(index, 1);
  }

  override submit(): void {
    const request: OrdersRequest = this.form.getRawValue() as any;
    // Creating a new array with productPrice removed from each product
    const modifiedProducts = request.products.map((product) => {
      const { productPrice, ...rest } = product;
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