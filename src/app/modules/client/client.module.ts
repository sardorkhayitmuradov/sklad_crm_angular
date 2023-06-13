import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzBreadCrumbModule,
  ],
})
export class ClientModule {}
