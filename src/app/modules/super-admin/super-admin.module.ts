import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SuperAdminComponent } from './super-admin.component';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [SuperAdminComponent],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzButtonModule
  ]
})
export class SuperAdminModule { }
