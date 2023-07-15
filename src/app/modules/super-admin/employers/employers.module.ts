import { NgModule } from '@angular/core';
import { EmployersRoutingModule } from './employers-routing.module';
import { EmployersComponent } from './employers.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { EditEmployersComponent } from './edit-employers/edit-employers.component';
import { AddEmployersComponent } from './add-employers/add-employers.component';


@NgModule({
  declarations: [EmployersComponent, AddEmployersComponent, EditEmployersComponent],
  imports: [
    EmployersRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule
  ],
  providers: [
    provideNgxMask()
  ],
})
export class EmployersModule { }
