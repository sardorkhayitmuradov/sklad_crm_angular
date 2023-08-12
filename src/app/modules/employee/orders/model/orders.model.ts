import { Id } from "src/app/modules/shared/models/id.interface";

export interface Products {
  productId: string;
  qty: number;
  price: number;
  productPrice: number;
}

export interface OrdersResponse extends Id, OrdersRequest {
  totalAmount: number;
}

export interface OrdersRequest {
  client_type: string;
  market_id: string;
  client_name: string;
  products: Products[];
  paid: number;
}
