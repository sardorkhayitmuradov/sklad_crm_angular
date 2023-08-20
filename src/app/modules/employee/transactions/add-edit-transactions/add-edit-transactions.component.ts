import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddEdit } from 'src/app/modules/shared/crud/add-edit.class';
import { TransactionsResponse, TransactionsRequest } from '../models/transactions.model';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionsService } from '../services/transactions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'employee-add-edit-transactions',
  templateUrl: './add-edit-transactions.component.html',
  styleUrls: ['./add-edit-transactions.component.css']
})
export class AddEditTransactionsComponent extends AddEdit<TransactionsResponse, TransactionsRequest> {

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
    amountPaid: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    $data: TransactionsService,
    $notification: NzNotificationService,
    router: Router,
    route: ActivatedRoute,
  ) {
    super($data,$notification, router, route);
  }

  /**
   *
   */
  protected override afterSuccess(): void {
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
