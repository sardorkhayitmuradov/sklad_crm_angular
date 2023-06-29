import { sales } from '../model/sales.model';

export const salesData: sales[] = [
  {
    id: Math.random(),
    code: `${Math.floor(Math.random() * 100)}`,
    quantity: Math.floor(Math.random() * 100),
    size: `100px`,
    price: Math.floor(Math.random() * 100),
    totalPrice: Math.floor(Math.random() * 1000),
    marketName: `Do'kon Nomi`,
    paidStatus: true,
  },
];
