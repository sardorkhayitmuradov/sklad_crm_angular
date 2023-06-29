import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuperAdminLoginRoutingModule } from './superAdminLogin-routing.module';
import { SuperAdminLoginComponent } from './superAdminLogin.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  declarations: [SuperAdminLoginComponent],
  imports: [
    CommonModule,
    SuperAdminLoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule
  ]
})
export class SuperAdminLoginModule { }