export interface Products {
  productId: string;
  qty: number;
  price: number;
}

export interface OrdersResponse extends OrdersRequest {
  totalAmount: number;
}

export interface OrdersRequest {
  client_type?: string;
  market_id?: string;
  client_name?: string;
  products: Products[];
  paid: number;
}
