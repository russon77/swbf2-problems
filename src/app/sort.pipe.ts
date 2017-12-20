import { Pipe, PipeTransform } from '@angular/core';
import { IProblem } from './api.service';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: IProblem[], sortBy: 'Date' | 'Votes' = null, args?: any): IProblem[] {
    value = Array.from(value);

    if (sortBy === 'Date') {
      return value.sort(
        (a, b) => {
          if (a.timestamp > b.timestamp) {
            return -1;
          } else if (a.timestamp < b.timestamp) {
            return 1;
          }

          return 0;
        }
      );
    } else if (sortBy === 'Votes') {
      return value.sort(
        (a, b) => {
          if (a.votes > b.votes) {
            return -1;
          } else if (a.votes < b.votes) {
            return 1;
          }

          return 0;
        }
      );
    }

    return value;
  }

}
