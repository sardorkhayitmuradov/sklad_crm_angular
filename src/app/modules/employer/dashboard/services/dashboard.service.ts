import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/modules/shared/services/base.service';
import { CRUDService } from 'src/app/modules/shared/services/crud.service';
import { dashboardModel } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends CRUDService<
  dashboardModel,
  dashboardModel
> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, 'statistics');
  }
}
