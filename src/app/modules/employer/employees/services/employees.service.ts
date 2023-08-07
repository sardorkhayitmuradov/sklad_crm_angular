// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeesRequest, Employees } from '../model/employees.model';
import { BaseService } from 'src/app/modules/shared/services/base.service';
import { CRUDService } from 'src/app/modules/shared/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService extends CRUDService<Employees, EmployeesRequest> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, 'employee');
  }
}
