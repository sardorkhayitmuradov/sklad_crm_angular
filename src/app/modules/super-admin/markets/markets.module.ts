import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketsRoutingModule } from './markets-routing.module';
import { NzTableModule  } from 'ng-zorro-antd/table'
import { MarketsComponent } from './markets.component';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  declarations: [MarketsComponent],
  imports: [
    CommonModule,
    MarketsRoutingModule,
    FormsModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule
  ]
})
  export class MarketsModule { }
