import { Id } from "src/app/modules/shared/models/id.interface";

export interface Products {
  productId: string;
  qty: number;
  overallPrice: number;
  price: number;
}

export interface OrdersResponse extends Id, OrdersRequest {
  totalAmount: number;
}

export interface OrdersRequest {
  client_type: string;
  market_id: string;
  market_name: string;
  client_name: string;
  products: Products[];
  paid: number;
}