import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../../shared/shared.module';
import { AddEditProductsComponent } from './add-edit-products/add-edit-products.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [ProductsComponent, AddEditProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask()
  ],
})
export class ProductsModule { }