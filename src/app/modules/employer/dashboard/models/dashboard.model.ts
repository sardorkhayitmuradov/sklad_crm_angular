import { Id } from 'src/app/modules/shared/models/id.interface';
export interface productsModel extends Id {
  productId: string;
  name: string;
  code: string;
  soldQty: number;
  inStoreQty: number;
}

export interface dashboardModel extends Id {
  month: string;
  year: string;
  products: productsModel[];
  employerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface dashboardPages {
  pageIndex: number;
  pageSize: number;
  all: number;
  count: number;
  year: number;
  month: string;
  pageSizeOptions: number[];
}

export interface SoldProductsModel {
  name: string;
  value: number;
}
[];

export interface remainedProductsModel {
  name: string;
  value: number;
}
[];
