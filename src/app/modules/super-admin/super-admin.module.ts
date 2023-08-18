import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { SuperAdminComponent } from './super-admin.component';


@NgModule({
  declarations: [SuperAdminComponent],
  imports: [
    SuperAdminRoutingModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule
  ],
  providers: [
    provideNgxMask()
  ],
})
export class SuperAdminModule { }
