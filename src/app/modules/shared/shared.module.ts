import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzNotificationServiceModule } from 'ng-zorro-antd/notification';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    NzSelectModule,
    NzNotificationServiceModule,

  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,

    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    NzSelectModule,
    NzNotificationServiceModule
  ],
})
export class SharedModule {}
