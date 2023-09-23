import { Id } from '../../shared/models/id.interface';

export interface role {
  iat: number;
  role: string;
  phone_number: string;
}

export interface EmployeeBalanceModel extends Id {
  fullname: string;
  phone_number: string;
  employer_id: string;
  balance: number;
  debt: number;
}
