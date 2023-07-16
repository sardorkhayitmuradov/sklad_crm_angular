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
  constructor(private $data: CRUDService<TResponse, TRequest>) {
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
   * @param id
   */
  delete(id: string) {
    this.$data.delete(id).subscribe(() => {
      this.getAll()
      this.data$.subscribe()
    });
  }
}
