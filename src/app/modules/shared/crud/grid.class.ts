import { Observable } from 'rxjs';
import { CRUDService } from '../services/crud.service';

export abstract class Grid<TResponse, TRequest> {
  /**
   *
   */
  data$!: Observable<TResponse>;

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
      this.getAll();
    });
  }
}
