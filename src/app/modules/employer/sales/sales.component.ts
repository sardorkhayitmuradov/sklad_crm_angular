import { Component, OnInit } from '@angular/core';
import { salesData } from './services/sales.service';

@Component({
  selector: 'sales',
  templateUrl: './sales.component.html',
})

export class SalesComponent {
    datas = salesData
}