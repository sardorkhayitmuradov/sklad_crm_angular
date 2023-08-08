import { Id } from "src/app/modules/shared/models/id.interface";

export interface Products {
  productId: string;
  qty: number;
  price: number;
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
