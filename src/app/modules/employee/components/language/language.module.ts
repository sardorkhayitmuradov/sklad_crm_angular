import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeLanguageComponent } from './language.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [EmployeeLanguageComponent],
  imports: [CommonModule, SharedModule],
})
export class LanguageModule {}
