import { Observable } from 'rxjs';
import { CRUDService } from '../services/crud.service';

export abstract class Grid<TResponse, TRequest> {
  [x: string]: any;
  /**
   *
   */
  data$!: Observable<TResponse[]>;

  /**
   *
   */
  constructor(private $data: CRUDService<TResponse, TRequest>) {
    this.getAll();
  }

  /**
   *
   */
  private getAll() {
    this.data$ = this.$data.getAll();
  }

  /**
   *
   * @param id
   */
  delete(id: number) {
    this.$data.delete(id).subscribe(() => {
      this.getAll();
    });
  }
}
