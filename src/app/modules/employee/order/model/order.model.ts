import { Id } from "src/app/modules/shared/models/id.interface";

export interface Products {
  code: string;
  name: string;
  unit: string;
  productId: string;
  qty: number;
  price: number;
  soldPrice: number;
}

export interface OrderResponse extends OrderRequest, Id {
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderRequest {
  client_type?: string;
  market_id?: string;
  client_name?: string;
  products: Products[];
  paid: number;
}


// "_id": "64b41afeabccd1e32970535b",
// "code": "#fdede5",
// "name": "Parket",
// "qty": 2,
// "price": 45000,
// "unit": "m2",
// "employerId": "64983cce46c0133d3dcb6c22",
// "createdAt": "2023-07-16T16:29:50.863Z",
// "updatedAt": "2023-08-08T12:58:09.400Z",
// "__v": 0,
// "soldPrice": 2000