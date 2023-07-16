import { Component, OnInit } from '@angular/core';
import { Products } from './models/products.model';

@Component({
  selector: 'employee-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;

  editCache: { [key: string]: { edit: boolean; data: Products } } = {};
  listOfData: Products[] = [];

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: `${i}`,
        code: `Code ${i}`,
        size: `O'lchami ${i}`,
        quantity: i * Math.floor(Math.random() * 10),
        price:  Math.floor(Math.random() * 100000),
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
