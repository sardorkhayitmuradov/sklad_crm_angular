import { Component } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { single } from './constants/single';
import { multi } from './constants/multi';
import { productsModel } from './models/dashboard.model';

@Component({
  selector: 'employee-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard-component.css']
})
export class DashboardComponent {
  multi: any[] = [];
  single: any[] = [];
  view: [number, number] = [1000, 480];

  //pie options
  pieGradient: boolean = false;
  pieShowLegend: boolean = true;
  pieShowLabels: boolean = true;
  pieIsDoughnut: boolean = false;
  pieLegendPosition: LegendPosition = LegendPosition.Right;

  //bar options
  barShowXAxis: boolean = true;
  barShowYAxis: boolean = true;
  barGradient: boolean = false;
  barShowLegend: boolean = true;
  barLegendPosition: LegendPosition = LegendPosition.Below;
  barShowXAxisLabel: boolean = true;
  barYAxisLabel: string = 'Country';
  barShowYAxisLabel: boolean = true;
  barXAxisLabel = 'Population';
  barSchemeType: ScaleType = ScaleType.Linear;

  pieColorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    name: 'Color Scheme',
    selectable: false,
    group: ScaleType.Linear
  };

  barColorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
    name: 'Color Scheme',
    selectable: false,
    group: ScaleType.Ordinal
  };

  constructor() {
    Object.assign(this, { single });
    Object.assign(this, { multi });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}