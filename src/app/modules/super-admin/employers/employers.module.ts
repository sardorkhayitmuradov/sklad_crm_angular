import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployersRoutingModule } from './employers-routing.module';
import { EmployersComponent } from './employers.component';


@NgModule({
  declarations: [
    EmployersComponent
  ],
  imports: [
    CommonModule,
    EmployersRoutingModule
  ]
})
export class EmployersModule { }
