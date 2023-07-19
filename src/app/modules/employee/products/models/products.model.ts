import { Id } from 'src/app/modules/shared/models/id.interface';

export interface Products extends Id, ProductsRequest {}

export interface ProductsRequest {
  code: string;
  name: string;
  qty: number;
  price: number;
  unit: string; // "dona", "kg", "m2", "qadoq"
}
