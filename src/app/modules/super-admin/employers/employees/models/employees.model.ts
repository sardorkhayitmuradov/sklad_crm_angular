import { Id } from "src/app/modules/shared/models/id.interface"

export interface Employees extends Id {
    fullname: string,
    phone_number: string,
    password: string,
    employer_id: string,
    balance: number,
    debt: number,
    __v: number
}

export interface EmployeesRequest  {
    fullname: string,
    phone_number: string,
    password: string,
    employerId: string
}
