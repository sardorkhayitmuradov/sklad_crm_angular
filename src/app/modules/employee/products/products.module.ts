import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { NzTableModule  } from 'ng-zorro-antd/table'
import { ProductsComponent } from './products.component';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule
  ]
})
export class ProductsModule { }
