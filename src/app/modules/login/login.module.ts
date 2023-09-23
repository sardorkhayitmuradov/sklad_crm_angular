import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

//Mask
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { LanguageModule } from '../components/language/language.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [LoginComponent],  
  imports: [
    LoginRoutingModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule,
    LanguageModule,
    TranslateModule
  ],
  providers: [
    provideNgxMask()
  ],
})
export class LoginModule { }