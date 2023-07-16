import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { EmployerComponent } from './employer.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';


@NgModule({
  declarations: [EmployerComponent],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzButtonModule,
    NzBreadCrumbModule
  ]
})
export class EmployerModule { }
