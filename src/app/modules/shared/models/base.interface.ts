export interface BaseResponse<T> {
  message: string;
  all: number;
  qtyOrders?: number;
  page: number;
  count: number;
  page_size: number;
  data: T;
}
