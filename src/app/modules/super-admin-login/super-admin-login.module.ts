import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminLoginComponent } from './super-admin-login.component';
import { SuperAdminLoginRoutingModule } from './super-admin-login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [SuperAdminLoginComponent],
  imports: [
    SuperAdminLoginRoutingModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask()
  ],
})
export class SuperAdminLoginModule { }
