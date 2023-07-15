import { Id } from 'src/app/modules/shared/models/id.interface';

export interface Employers extends Id {
    fullname: string,
    admin_id: string,
    phone_number: string,
    password: string,
    balance: number,
    __v: number
}

export interface EmployersResponse extends EmployersRequest {
    token?: string
    message: string,
    error?: string; 
    employers: Employers[]
}

export interface EmployersRequest  {
    fullname: string,
    phone_number: string,
    password: string,
}
