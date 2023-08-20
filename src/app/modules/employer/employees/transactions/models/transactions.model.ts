import { Id } from 'src/app/modules/shared/models/id.interface';

export interface TransactionsResponse extends Id, TransactionsRequest {
  fromEmployeeId: string;
  toEmployerId: string;
  employerAccepted: boolean;
  createdAt: string; // Date
  updatedAt: string; // Date
  v: number;
}

export interface TransactionsRequest {
    amountPaid: number;
}
