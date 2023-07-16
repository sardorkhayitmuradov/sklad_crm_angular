import { Component } from '@angular/core';
import { salesData } from './services/sales.service';

@Component({
  selector: 'employer-sales',
  templateUrl: './sales.component.html',
})

export class SalesComponent {
    datas = salesData
}