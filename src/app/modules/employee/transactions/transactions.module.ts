import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AddEditTransactionsComponent } from './add-edit-transactions/add-edit-transactions.component';


@NgModule({
  declarations: [TransactionsComponent, AddEditTransactionsComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask()
  ],
})
export class TransactionsModule { }
