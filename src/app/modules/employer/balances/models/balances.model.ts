import { Id } from 'src/app/modules/shared/models/id.interface';

export interface BalancesModel extends Id {
  month: string;
  year: string;
  balance: number;
  employerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface balancePages {
  pageIndex: number;
  pageSize: number;
  all: number;
  count: number;
  year: number;
  month: string;
  pageSizeOptions: number[];
}
