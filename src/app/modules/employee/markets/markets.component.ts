import { Component, OnInit } from '@angular/core';
import { Markets } from './models/markets.models';

@Component({
  selector: 'employee-markets',
  templateUrl: './markets.component.html',
})
export class MarketsComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;

  editCache: { [key: string]: { edit: boolean; data: Markets } } = {};
  listOfData: Markets[] = [];

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: `${i}`,
        name: `Nom ${i}`,
        number: `+99894 425 72 4${i}`,
        address: `London Park no. ${i}`,
      });
    }
    this.listOfData = data;
  }

  // Modal

  showAddModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 2000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  // Add Form Modal 
}
