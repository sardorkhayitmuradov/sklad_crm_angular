import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployerComponent } from './employer.component';
import { LanguageModule } from '../components/language/language.module';

@NgModule({
  declarations: [EmployerComponent],
  imports: [CommonModule, EmployerRoutingModule, SharedModule, LanguageModule],
})
export class EmployerModule {}
