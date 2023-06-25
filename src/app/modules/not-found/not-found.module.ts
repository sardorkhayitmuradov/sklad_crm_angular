import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import {NzResultModule} from 'ng-zorro-antd/result'
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    NzResultModule,
    NzButtonModule
  ]
})
export class NotFoundModule { }
