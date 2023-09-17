import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployerComponent } from './employer.component';
import { EmployerLanguageComponent } from './components/language/language.component';

@NgModule({
  declarations: [EmployerComponent, EmployerLanguageComponent],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    SharedModule
  ]
})
export class EmployerModule { }
