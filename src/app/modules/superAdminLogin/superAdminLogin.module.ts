import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SuperAdminLoginRoutingModule } from './superAdminLogin-routing.module';
import { SuperAdminLoginComponent } from './superAdminLogin.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [SuperAdminLoginComponent],
  imports: [
    SuperAdminLoginRoutingModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule
  ],
  providers: [
    provideNgxMask()
  ],
})
export class SuperAdminLoginModule { }
