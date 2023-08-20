import { Observable } from 'rxjs';
import { CRUDService } from '../services/crud.service';
import { BaseResponse } from '../models/base.interface';

export abstract class Grid<TResponse, TRequest> {
  /**
   *
   */
  data$!: Observable<BaseResponse<TResponse[]>>;

  /**
   *
   */
  constructor(protected $data: CRUDService<TResponse, TRequest>) {
    this.getAll();
  }

  /**
   *
   */
  getAll() {
    this.data$ = this.$data.getAll();
  }

  /**
   *
   */
  getByPagination(page: number, pageSize: number) {
    this.data$ = this.$data.getByPagination(page, pageSize);
  }
}
