import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from './language.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LanguageComponent],
  imports: [CommonModule, FormsModule, NzSelectModule],
  exports: [LanguageComponent],
})
export class LanguageModule {}
