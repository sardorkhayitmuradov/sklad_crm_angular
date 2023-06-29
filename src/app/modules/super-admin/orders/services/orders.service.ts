import { orders } from "../model/orders.model";

export const ordersData: orders[] = [
  {
    id: Math.floor(Math.random() * 100),
    date: `${new Date().toLocaleDateString('en-US')}`,
    debt: Math.floor(Math.random() * 1000000 ),
    paid: Math.floor(Math.random() * 100000),
    totalPrice: Math.floor(Math.random() * 1000000),
  },
  {
    id: Math.floor(Math.random() * 100),
    date: `${new Date().toLocaleDateString('en-US')}`,
    debt: Math.floor(Math.random() * 1000 ),
    paid: Math.floor(Math.random() * 100000),
    totalPrice: Math.floor(Math.random() * 1000000),
  },
  {
    id: Math.floor(Math.random() * 100),
    date: `${new Date().toLocaleDateString('en-US')}`,
    debt: Math.floor(Math.random() * 1000 ),
    paid: Math.floor(Math.random() * 100000),
    totalPrice: Math.floor(Math.random() * 1000000),
  },
  {
    id: Math.floor(Math.random() * 100),
    date: `${new Date().toLocaleDateString('en-US')}`,
    debt: Math.floor(Math.random() * 1000 ),
    paid: Math.floor(Math.random() * 100000),
    totalPrice: Math.floor(Math.random() * 1000000),
  },
  {
    id: Math.floor(Math.random() * 100),
    date: `${new Date().toLocaleDateString('en-US')}`,
    debt: Math.floor(Math.random() * 1000 ),
    paid: Math.floor(Math.random() * 100000),
    totalPrice: Math.floor(Math.random() * 1000000),
  },
  {
    id: Math.floor(Math.random() * 100),
    date: `${new Date().toLocaleDateString('en-US')}`,
    debt: Math.floor(Math.random() * 1000 ),
    paid: Math.floor(Math.random() * 100000),
    totalPrice: Math.floor(Math.random() * 1000000),
  },
  {
    id: Math.floor(Math.random() * 100),
    date: `${new Date().toLocaleDateString('en-US')}`,
    debt: Math.floor(Math.random() * 1000 ),
    paid: Math.floor(Math.random() * 100000),
    totalPrice: Math.floor(Math.random() * 1000000),
  },
  {
    id: Math.floor(Math.random() * 100),
    date: `${new Date().toLocaleDateString('en-US')}`,
    debt: Math.floor(Math.random() * 1000 ),
    paid: Math.floor(Math.random() * 100000),
    totalPrice: Math.floor(Math.random() * 1000000),
  }
];
