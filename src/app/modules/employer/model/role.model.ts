import { Id } from '../../shared/models/id.interface';

export interface role {
  iat: number;
  phone_number: string;
  role: string;
}

export interface EmployerBalanceModel extends Id {
  fullname: string;
  admin_id: string;
  phone_number: string;
  password: string;
  balance: number;
  __v: number;
}
