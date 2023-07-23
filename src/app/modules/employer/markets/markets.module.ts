import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketsRoutingModule } from './markets-routing.module';
import { MarketsComponent } from './markets.component';
import { SharedModule } from '../../shared/shared.module';
import { AddEditMarketsComponent } from './add-edit-markets/add-edit-markets.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [MarketsComponent, AddEditMarketsComponent],
  imports: [
    CommonModule,
    MarketsRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule
  ],
  providers: [
    provideNgxMask()
  ],
})
  export class MarketsModule { }
