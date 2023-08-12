import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './transactions.component';
import { AddEditTransactionsComponent } from './add-edit-transactions/add-edit-transactions.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
  },
  {
    path: 'add',
    component: AddEditTransactionsComponent,
    data: {
      breadcrumbWithTranslate: 'Add',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
