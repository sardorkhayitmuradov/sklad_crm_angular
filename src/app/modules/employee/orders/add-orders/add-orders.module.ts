import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AddOrdersComponent } from './add-orders.component';
import { AddOrdersRoutingModule } from './add-orders-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [
    AddOrdersComponent
  ],
  imports: [
    CommonModule,
    AddOrdersRoutingModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask()
  ],
})
export class AddOrdersModule { }
