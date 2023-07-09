import { NgModule } from '@angular/core';
import { EmployersRoutingModule } from './employers-routing.module';
import { EmployersComponent } from './employers.component';
import { SharedModule } from '../../shared/shared.module';
import { AddEditEmployersComponent } from './add-edit-employers/add-edit-employers.component';


@NgModule({
  declarations: [EmployersComponent, AddEditEmployersComponent],
  imports: [
    EmployersRoutingModule,
    SharedModule
  ]
})
export class EmployersModule { }
