export interface BaseResponse<T> {
  message: string;
  all: number;
  page: number;
  count: number;
  page_size: number;
  data: T;
}
